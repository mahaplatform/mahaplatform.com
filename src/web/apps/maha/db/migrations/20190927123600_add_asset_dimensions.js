import s3 from '../../../../core/services/s3'
import request from 'request-promise'
import sharp from 'sharp'

const AddAssetDimensions = {

  up: async (knex) => {

    await knex.schema.table('maha_assets', (table) => {
      table.jsonb('metadata')
    })
    // 
    // const images = await knex('maha_assets').whereRaw('content_type like ?', 'image/jpeg')
    //
    // await Promise.mapSeries(images, async (image) => {
    //
    //   const url = s3.getSignedUrl('getObject', {
    //     Bucket: 'cdn.mahaplatform.com',//process.env.AWS_BUCKET,
    //     Key: `assets/${image.id}/${image.file_name}`,
    //     Expires: 60
    //   })
    //
    //   try {
    //
    //     const data = await request.get(url, {
    //       encoding: null
    //     })
    //
    //     const metadata = await sharp(data).metadata()
    //
    //     await knex('maha_assets').where('id', image.id).update({
    //       metadata: {
    //         width: metadata.width,
    //         height: metadata.height
    //       }
    //     })
    //
    //   } catch(e) {
    //     console.log(e, `failed on ${image.id}`)
    //   }
    //
    // })

  },

  down: async (knex) => {
  }

}

export default AddAssetDimensions
