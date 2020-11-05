import { expandValues } from '@apps/maha/services/values'
import Item from '@apps/sites/models/item'

const showRoute = async (req, res) => {

  const item = await Item.query(qb => {
    qb.where('team_id', req.team.get('id'))
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
    ...await expandValues(req, {
      parent_type: 'sites_types',
      parent_id: req.params.type_id,
      data: result.get('values'),
      withNames: true
    })
  }))

}

export default showRoute
