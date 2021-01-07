import { contactActivity } from '@apps/crm/services/activities'
import Email from '@apps/maha/models/email'

const EmailActivities = {

  databaseName: 'maha',

  up: async (knex) => {

    const emails = await Email.query(qb => {
      qb.whereNotNull('email_campaign_id')
    }).fetchAll({
      withRelated: ['contact','email_campaign','team'],
      transacting: knex
    })

    await Promise.map(emails, async(email) => {

      const activity = await contactActivity({
        trx: knex,
        team: email.related('team')
      }, {
        contact: email.related('contact'),
        type: 'email_campaign',
        story: 'received an email campaign',
        program_id: email.related('email_campaign').get('program_id'),
        data: {
          email_id: email.get('id'),
          email_campaign_id: email.get('email_campaign_id')
        }
      })

      await knex('crm_activities').where('id', activity.get('id')).update({
        created_at: email.get('created_at'),
        updated_at: email.get('updated_at')
      })

    })


  },

  down: async (knex) => {
  }

}

export default EmailActivities
