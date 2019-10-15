import Training from '../../../models/training'

const showRoute = async (req, res) => {

  const training = await Training.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['materials'],
    transacting: req.trx
  })

  if(!training) return res.status(404).respond({
    code: 404,
    message: 'Unable to load training'
  })

  res.status(200).respond(training, {
    fields: [
      'id',
      'asset_ids',
      'title',
      'description',
      'url',
      'location',
      'contact',
      'notes',
      'is_verification_required'
    ]
  })

}

export default showRoute
