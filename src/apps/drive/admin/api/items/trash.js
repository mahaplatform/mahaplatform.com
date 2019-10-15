import { moveToTrash } from '../../../services/items'
import Item from '../../../models/item'

const trashRoute = async (req, res) => {

  const items = await Item.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
    qb.whereRaw('drive_items.type != ?', 'metafile')
    qb.whereNull('drive_items.deleted_at')
    qb.whereIn('drive_items.code', req.body.codes)
  }).fetchAll({
    withRelated: ['asset.source','accesses.access_type','accesses.user.photo','accesses.group','folder'],
    transacting: req.trx
  }).then(items => items.toArray())

  await Promise.mapSeries(items, async (item) => {

    await moveToTrash(req, item)

  })

  res.status(200).respond(true)

}

export default trashRoute
