import { generateScreenshot } from '../../services/email'
import EmailCampaign from '../../models/email_campaign'
import Email from '../../models/email'

const generate = async (knex, key, model) => {

  const items = await model.fetchAll({
    withRelated: ['team'],
    transacting: knex
  })

  await Promise.mapSeries(items, async(item) => {
    await generateScreenshot({
      team: item.related('team'),
      trx: knex
    }, {
      [`${key}_id`]: item.get('id')
    })
  })

}

const RegenerateScreenshots = {

  up: async (knex) => {

    await Promise.mapSeries(['template','email','email_campaign'], async(model) => {
      await knex.schema.table(`crm_${model}s`, (table) => {
        table.bool('has_preview')
      })
      await knex(`crm_${model}s`).update({
        has_preview: true
      })
    })

    await generate(knex, 'email', Email)

    await generate(knex, 'email_campaign', EmailCampaign)

  },

  down: async (knex) => {
  }

}

export default RegenerateScreenshots
