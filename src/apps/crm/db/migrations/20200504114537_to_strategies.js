const ToStrategies = {

  up: async (knex) => {
    await Promise.mapSeries(['email','sms','voice'], async (channel) => {
      const campaigns = await knex(`crm_${channel}_campaigns`)
      await Promise.mapSeries(campaigns, async (campaign) => {
        await knex(`crm_${channel}_campaigns`).where('id', campaign.id).update({
          to: {
            strategy: 'criteria',
            ...campaign.to
          }
        })

      })
    })
  },

  down: async (knex) => {
  }

}

export default ToStrategies
