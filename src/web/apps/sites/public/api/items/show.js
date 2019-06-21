import { expandValues } from '../../../../maha/services/values'
import Item from '../../../models/item'

const showRoute = async (req, res) => {

  const item = await Item.scope({
    team: req.team
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

  res.status(200).respond(item, async (req, result) => ({
    id: result.get('id'),
    ...await expandValues(req, 'sites_types', req.params.type_id, result.get('values'))
  }))

}

export default showRoute
