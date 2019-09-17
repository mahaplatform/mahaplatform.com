import Team from '../../../../maha/models/team'

const editRoute = async (req, res) => {

  const team = await Team.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['apps'],
    transacting: req.trx
  })

  if(!team) return res.status(404).respond({
    code: 404,
    message: 'Unable to load team'
  })

  res.status(200).respond(team, {
    fields: [
      'id',
      'title',
      'subdomain',
      'logo_id',
      'authentication_strategy',
      'app_ids'
    ]
  })

}

export default editRoute
