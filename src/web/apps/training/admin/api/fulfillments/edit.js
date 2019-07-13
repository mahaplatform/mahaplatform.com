import Fulfillment from '../../../models/fulfillment'

const showRoute = async (req, res) => {

  const fulfillment = await Fulfillment.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!fulfillment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load fulfillment'
  })

  res.status(200).respond(fulfillment, {
    fields: [
      'offering_id'
    ]
  })

}

export default showRoute
