import generateCode from '@core/utils/generate_code'

const EmailCodes = {

  up: async (knex) => {

    const req = { trx: knex }

    await knex.schema.table('crm_templates', (t) => {
      t.string('code')
    })

    const items = await knex('crm_templates')

    await Promise.mapSeries(items, async (item) => {

      const code = await generateCode(req, {
        table: 'crm_templates'
      })

      await knex('crm_templates').where('id', item.id).update({ code })

    })

  },

  down: async (knex) => {
  }

}

export default EmailCodes
