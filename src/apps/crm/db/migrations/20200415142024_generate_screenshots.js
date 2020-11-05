import { generateScreenshot } from '@apps/crm/services/email'
import EmailCampaign from '@apps/crm/models/email_campaign'
import Email from '@apps/crm/models/email'

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

const GenerateScreenshots = {

  up: async (knex) => {

    await generate(knex, 'email', Email)

    await generate(knex, 'email_campaign', EmailCampaign)

  },

  down: async (knex) => {
  }

}

export default GenerateScreenshots
