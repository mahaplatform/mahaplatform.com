import Classification from '../../../models/classification'

const editRoute = async (req, res) => {

  const classification = await Classification.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!classification) return res.status(404).respond({
    code: 404,
    message: 'Unable to load classification'
  })

  res.status(200).respond(classification, {
    fields: [
      'id',
      'title'
    ]
  })

}

export default editRoute
