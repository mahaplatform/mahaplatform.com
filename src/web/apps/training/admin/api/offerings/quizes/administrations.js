import Administration from '../../../../models/administration'
import Fulfillment from '../../../../models/fulfillment'

const administrationsRoute = async (req, res) => {

  const fulfillments = await Fulfillment.scope({
    team: req.team
  }).query(qb => {
    qb.where('offering_id', req.params.offering_id)
  }).fetchAll({
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  const administrations = await Administration.scope({
    team: req.team
  }).query(qb => {
    qb.innerJoin('training_fulfillments','training_fulfillments.user_id','training_administrations.user_id')
    qb.where('training_fulfillments.offering_id', req.params.offering_id)
    qb.where('training_administrations.quiz_id', req.params.id)
  }).fetchPage({
    withRelated: ['quiz.questions','answerings'],
    page: req.query.$page,
    transacting: req.trx
  })

  const data = fulfillments.map(fulfillment => {
    const administration = administrations.find(administration => {
      return administration.get('user_id') === fulfillment.get('user_id')
    })
    return {
      id: fulfillment.get('id'),
      user: {
        id: fulfillment.related('user').get('id'),
        full_name: fulfillment.related('user').get('full_name'),
        initials: fulfillment.related('user').get('initials'),
        photo: fulfillment.related('user').related('photo').get('path')
      },
      score: administration ? administration.get('score') : null,
      was_passed: administration ? administration.get('was_passed') : null
    }
  })

  res.status(200).respond(data)

}

export default administrationsRoute
