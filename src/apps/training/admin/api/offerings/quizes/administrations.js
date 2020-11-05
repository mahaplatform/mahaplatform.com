import Administration from '@apps/training/models/administration'
import Fulfillment from '@apps/training/models/fulfillment'

const administrationsRoute = async (req, res) => {

  const fulfillments = await Fulfillment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('offering_id', req.params.offering_id)
  }).fetchAll({
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  const administrations = await Administration.filterFetch({
    scope: qb => {
      qb.innerJoin('training_fulfillments','training_fulfillments.user_id','training_administrations.user_id')
      qb.where('training_fulfillments.offering_id', req.params.offering_id)
      qb.where('training_administrations.quiz_id', req.params.id)
      qb.where('training_administrations.team_id', req.team.get('id'))
    },
    page: req.query.$page,
    withRelated: ['quiz.questions','answerings'],
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
