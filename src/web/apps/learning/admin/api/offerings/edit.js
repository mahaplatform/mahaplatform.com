import Offering from '../../../models/offering'

const showRoute = async (req, res) => {

  const offering = await Offering.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!offering) return res.status(404).respond({
    code: 404,
    message: 'Unable to load offering'
  })

  res.status(200).respond(offering, {
    fields: [
      'id',
      'training_id',
      'date',
      'starts_at',
      'ends_at',
      'limit'
    ]
  })

}

export default showRoute
