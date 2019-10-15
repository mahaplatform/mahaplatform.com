import Resource from '../../../models/resource'

const editRoute = async (req, res) => {

  const resource = await Resource.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!resource) return res.status(404).respond({
    code: 404,
    message: 'Unable to load resource'
  })

  res.status(200).respond(resource, {
    fields: [
      'id',
      'title',
      'description',
      'url',
      'asset_id'
    ]
  })

}

export default editRoute
