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

    await generate(knex, 'email', Email)

    await generate(knex, 'email_campaign', EmailCampaign)

  },

  down: async (knex) => {
  }

}

export default RegenerateScreenshots
