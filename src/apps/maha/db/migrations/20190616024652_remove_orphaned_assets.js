import s3 from '../../../../web/core/services/s3'
import _ from 'lodash'

const RemoveOrphanedAssets = {

  up: async (knex) => {

    const assets = await knex.raw(`
      select maha_assets.*
      from maha_assets
      left join competencies_resources on competencies_resources.asset_id=maha_assets.id
      left join drive_versions on drive_versions.asset_id=maha_assets.id
      left join eatfresh_attractions on eatfresh_attractions.photo_id=maha_assets.id
      left join eatfresh_categories on eatfresh_categories.photo_id=maha_assets.id
      left join eatfresh_offerings on eatfresh_offerings.photo_id=maha_assets.id
      left join eatfresh_photos on eatfresh_photos.asset_id=maha_assets.id
      left join expenses_receipts on expenses_receipts.asset_id=maha_assets.id
      left join maha_attachments on maha_attachments.asset_id=maha_assets.id
      left join maha_imports on maha_imports.asset_id=maha_assets.id
      left join maha_teams on maha_teams.logo_id=maha_assets.id
      left join maha_users on maha_users.photo_id=maha_assets.id
      where competencies_resources.id is null
      and drive_versions.id is null
      and eatfresh_attractions.id is null
      and eatfresh_categories.id is null
      and eatfresh_offerings.id is null
      and eatfresh_photos.id is null
      and expenses_receipts.id is null
      and maha_attachments.id is null
      and maha_imports.id is null
      and maha_teams.id is null
      and maha_users.id is null
      order by maha_assets.id
    `)

    const chunks = _.chunk(assets.rows, 500)

    await Promise.mapSeries(chunks, async(chunk) => await s3.deleteObjects({
      Bucket: process.env.AWS_BUCKET,
      Delete: {
        Objects: chunk.reduce((objects, asset) => [
          ...objects,
          { Key: `assets/${asset.id}/${asset.file_name}` },
          { Key: `assets/${asset.id}/preview.jpg` }
        ], [])
      }
    }).promise())

    await knex('maha_assets').whereIn('id', assets.rows.map(asset => {
      return asset.id
    })).delete()

  },

  down: async (knex) => {
  }

}

export default RemoveOrphanedAssets
