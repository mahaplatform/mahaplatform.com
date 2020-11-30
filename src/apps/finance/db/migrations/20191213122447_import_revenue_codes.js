import RevenueType from '@apps/finance/models/revenue_type'
import { s3 } from '@core/services/aws'
import csvparse from 'csv-parse/lib/sync'
import request from 'request-promise'

const ImportRevenueCodes = {

  up: async (knex) => {

    const url = s3.getSignedUrl('getObject', {
      Bucket: 'cdn.mahaplatform.com',
      Key: 'data/revenue_codes.csv',
      Expires: 60
    })

    const data = await request.get(url, {
      encoding: null
    })

    const parsed = csvparse(data, {
      delimiter: '\t'
    })

    await Promise.map(parsed, async (row, index) => {
      if(index === 0) return
      await RevenueType.forge({
        team_id: 1,
        title: row[0],
        description: row[1],
        integration: {
          revenue_code: row[2],
          source_code: row[3]
        },
        is_active: true
      }).save(null, {
        transacting: knex
      })
    })

  },

  down: async (knex) => {
  }

}

export default ImportRevenueCodes
