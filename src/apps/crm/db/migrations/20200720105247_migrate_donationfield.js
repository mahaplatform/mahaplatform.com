import Form from '@apps/crm/models/form'

const MigrateDonationfield = {

  up: async (knex) => {

    const forms = await Form.fetchAll({
      transacting: knex
    })

    await Promise.mapSeries(forms, async (form) => {
      const config = form.get('config')
      await form.save({
        config: {
          ...config,
          fields: config.fields.map(field => {
            if(field.type !== 'donationfield') return field
            return {
              ...field,
              type: 'paymentfield',
              is_tax_deductible: true
            }
          })
        }
      }, {
        transacting: knex
      })
    })

  },

  down: async (knex) => {
  }

}

export default MigrateDonationfield
