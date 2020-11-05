import Type from '@apps/sites/models/type'

const editRoute = async (req, res) => {

  const type = await Type.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!type) return res.status(404).respond({
    code: 404,
    message: 'Unable to load advance'
  })

  res.status(200).respond(type, {
    fields: [
      'id',
      'title',
      'description',
      'requires_approval',
      'has_public_submission'
    ]
  })

}

export default editRoute
