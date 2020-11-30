import { s3 } from '@core/services/aws'
import csvparse from 'csv-parse/lib/sync'
import request from 'request-promise'

const AddAssetDimensions = {

  up: async (knex) => {

    await knex.schema.table('maha_assets', (table) => {
      table.string('fingerprint')
      table.integer('width')
      table.integer('height')
    })

    const url = s3.getSignedUrl('getObject', {
      Bucket: 'cdn.mahaplatform.com',
      Key: 'data/metadata.csv',
      Expires: 60
    })

    const data = await request.get(url, {
      encoding: null
    })

    const parsed = csvparse(data)

    await Promise.map(parsed, async (row) => {
      const [id,fingerprint,width,height] = row
      await knex('maha_assets').where({ id }).update({
        fingerprint,
        width: width || null,
        height: height || null
      })
    })

  },

  down: async (knex) => {}

}

export default AddAssetDimensions
