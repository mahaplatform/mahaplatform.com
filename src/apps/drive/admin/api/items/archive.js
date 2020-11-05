import { getAssetData } from '@apps/maha/services/assets'
import Item from '../../../models/item'
import archiver from 'archiver'
import moment from 'moment'

const archiveRoute = async (req, res) => {

  const items = await Item.query(qb => {
    qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
    qb.whereRaw('drive_items.type != ?', 'metafile')
    qb.whereIn('drive_items.code', req.query.codes)
  }).fetchAll({
    withRelated: ['asset'],
    transacting: req.trx
  }).then(items => items.toArray())

  const archive = archiver('zip', {
    zlib: { level: 9 }
  })

  archive.on('error', function(err) {
    res.status(500).send({ error: err.message })
  })

  await Promise.mapSeries(items, async item => {
    const data = await getAssetData(item.related('asset'))
    archive.append(data, {
      name: item.related('asset').get('original_file_name')
    })
  })

  const timestamp = moment().format('YYYYMMDDhhmmss')

  res.attachment(`drive-download-${timestamp}.zip`)

  archive.pipe(res)

  archive.finalize()

}

export default archiveRoute
