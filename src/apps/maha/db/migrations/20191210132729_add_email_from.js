import cheerio from 'cheerio'

const AddEmailFrom = {

  up: async (knex) => {

    await knex.schema.table('maha_emails', (table) => {
      table.string('from')
    })

    await knex('maha_emails').update({
      from: 'Maha <mailer@mahaplatform.com>'
    })

    const emails = await knex('maha_emails')

    await Promise.mapSeries(emails, async (email) => {
      const $ = cheerio.load(email.html)
      $('style:contains("#outlook")').replaceWith('<link href="https://mahaplatform.com/admin/css/foundation-emails.min.css" rel="stylesheet"></link>')
      $('style:contains(".header")').replaceWith('<link href="https://mahaplatform.com/admin/css/maha-emails.min.css" rel="stylesheet"></link>')
      await knex('maha_emails').where('id', email.id).update({
        html: $.html()
      })
    })

  },

  down: async (knex) => {
  }

}

export default AddEmailFrom
