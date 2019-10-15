import Organization from '../../../models/organization'

const editRoute = async (req, res) => {

  const organization = await Organization.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!organization) return res.status(404).respond({
    code: 404,
    message: 'Unable to load organization'
  })

  res.status(200).respond(organization, {
    fields: [
      'id',
      'name',
      'logo_id',
      'values'
    ]
  })

}

export default editRoute
