import _ from 'lodash'

const RemoveDuplicates = {

  databaseName: 'maha',

  up: async (knex) => {

    const mailing_addresses = knex({ ma1: 'crm_mailing_addresses' })
      .select(knex.raw('ma1.contact_id, ma1.id as keep_id, ma2.id as discard_id'))
      .joinRaw('inner join crm_mailing_addresses ma2 on ma2.team_id=ma1.team_id and ma2.contact_id=ma1.contact_id and ma2.address->>\'description\'=ma1.address->>\'description\' and ma2.id != ma1.id')
      .orderBy('ma1.id','asc')

    const keep = []

    const discard = []

    await Promise.mapSeries(mailing_addresses, async(mailing_address) => {
      if(_.includes(keep, mailing_address.discard_id)) return
      keep.push(mailing_address.keep_id)
      discard.push(mailing_address.discard_id)
    })

    await Promise.mapSeries(discard, async(id) => {
      await knex('crm_mailing_addresses').where('id', id).del()
    })

    await knex('crm_mailing_addresses').whereRaw('address->>\'street_1\' like ?', '%null%').del()

    await knex('crm_mailing_addresses').whereRaw('address->>\'description\' like ?', '%same%').del()

  },

  down: async (knex) => {
  }

}

export default RemoveDuplicates
