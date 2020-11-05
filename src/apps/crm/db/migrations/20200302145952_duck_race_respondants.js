import generateCode from '@core/utils/generate_code'
import Response from '@apps/crm/models/response'
import Consent from '@apps/crm/models/consent'

const DuckRaceRespondants = {

  up: async (knex) => {

    const responses = await Response.query(qb => {
      qb.whereRaw('data->\'3tjrwr\'=?',true)
    }).fetchAll({
      transacting: knex
    }).then(result => result.toArray())

    await Promise.mapSeries(responses, async(response) => {

      const code = await generateCode({ trx: knex }, {
        table: 'crm_consents'
      })

      await Consent.forge({
        team_id: 1,
        email_address_id: response.get('contact_id'),
        code,
        type: 'email',
        optin_reason: 'consent',
        program_id: 5
      }).save(null, {
        transacting: knex
      })

      await knex('crm_interests').insert({
        contact_id: response.get('contact_id'),
        topic_id: 1
      })

    })

  },

  down: async (knex) => {
  }

}

export default DuckRaceRespondants
