import ItemSerializer from '../../../serializers/item_serializer'
import Field from '../../../../maha/models/field'
import Item from '../../../models/item'

const showRoute = async (req, res) => {

  req.fields = await Field.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('parent_type', 'sites_types')
    qb.where('parent_id', req.params.type_id)
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const item = await Item.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('site_id', req.params.site_id)
    qb.where('type_id', req.params.type_id)
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!item) return res.status(404).respond({
    code: 404,
    message: 'Unable to load item'
  })

  res.status(200).respond(item, ItemSerializer)

}

export default showRoute
