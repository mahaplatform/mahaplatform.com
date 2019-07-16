import AdministrationSerializer from '../../../../serializers/administration_serializer'
import Administration from '../../../../models/administration'

const administrationsRoute = async (req, res) => {

  const administrations = await Administration.scope({
    team: req.team
  }).query(qb => {
    qb.innerJoin('training_fulfillments','training_fulfillments.user_id','training_administrations.user_id')
    qb.where('training_fulfillments.offering_id', req.params.offering_id)
    qb.where('training_administrations.quiz_id', req.params.id)
  }).fetchPage({
    withRelated: ['quiz.questions','answerings','user.photo'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(administrations, AdministrationSerializer)

}

export default administrationsRoute
