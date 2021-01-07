import Email from '@apps/crm/models/email'

const FixEmails = {

  databaseName: 'maha',

  up: async (knex) => {

    const emails = await Email.query(qb => {
      qb.whereRaw('crm_emails.config->\'settings\'->\'subject\' is null')
    }).fetchAll({
      withRelated: ['workflow.form.program.senders','audit.user'],
      transacting: knex
    })

    await Promise.mapSeries(emails, async(email) => {
      await email.save({
        config: {
          ...email.get('config'),
          settings: {
            sender_id: email.related('workflow').related('form').related('program').related('senders').toArray()[0].get('id'),
            subject: 'Thank you for your response',
            reply_to: email.related('audit').toArray()[0].related('user').get('email')
          }
        }
      },{
        transacting: knex,
        patch: true
      })
    })

  },

  down: async (knex) => {
  }

}

export default FixEmails
