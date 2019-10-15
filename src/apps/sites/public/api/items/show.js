import { expandValues } from '../../../../maha/services/values'
import Item from '../../../models/item'

const showRoute = async (req, res) => {

  const item = await Item.scope(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('site_id', req.params.site_id)
    qb.where('type_id', req.params.type_id)
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!item) return res.status(404).respond({
    code: 404,
    message: 'Unable to load item'
  })

  res.status(200).respond(item, async (req, result) => ({
    id: result.get('id'),
    ...await expandValues(req, 'sites_types', req.params.type_id, result.get('values'))
  }))

}

export default showRoute
