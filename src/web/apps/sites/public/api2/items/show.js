import { expandValues } from '../../../../maha/services/values'
import Item from '../../../models/item'

const showRoute = async (req, res) => {

  const item = await Item.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('site_id', req.params.site_id)
    qb.where('type_id', req.params.type_id)
    qb.where('id', req.params.id)
  })

  if(!item) return req.status(404).respond({
    code: 404,
    message: 'Unable to load item'
  })

  const serializer = async (req, trx, result) => ({
    id: result.get('id'),
    ...await expandValues('sites_types', req.params.type_id, result.get('values'), req.trx)
  })

  res.status(200).respond(item, (item) => {
    return serializer(req, req.trx, item)
  })

}

export default showRoute
