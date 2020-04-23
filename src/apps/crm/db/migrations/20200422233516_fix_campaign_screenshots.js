import { generateScreenshot } from '../../services/email'
import EmailCampaign from '../../models/email_campaign'

const FixCampaignScreenshots = {

  up: async (knex) => {

    await Promise.mapSeries(['template','email','email_campaign'], async(model) => {
      await knex.schema.table(`crm_${model}s`, (table) => {
        table.dropColumn('has_preview')
      })
    })

    const items = await EmailCampaign.query(qb => {
      qb.whereNull('deleted_at')
    }).fetchAll({
      withRelated: ['team'],
      transacting: knex
    })

    await Promise.mapSeries(items, async(item) => {
      await generateScreenshot({
        team: item.related('team'),
        trx: knex
      }, {
        email_campaign_id: item.get('id')
      })
    })

  },

  down: async (knex) => {
  }

}

export default FixCampaignScreenshots
