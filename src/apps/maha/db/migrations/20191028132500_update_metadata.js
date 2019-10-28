import s3 from '../../../../core/services/s3'
import csvparse from 'csv-parse/lib/sync'
import request from 'request-promise'

const AddAssetDimensions = {

  up: async (knex) => {

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
      if(id < 9314) return
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
