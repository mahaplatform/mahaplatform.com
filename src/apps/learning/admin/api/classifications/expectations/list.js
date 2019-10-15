import ExpectationSerializer from '../../../../serializers/expectation_serializer'
import Expectation from '../../../../models/expectation'

const listRoute = async (req, res) => {

  const expectations = await Expectation.scope(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('classification_id', req.params.classification_id)
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['competency'],
    transacting: req.trx
  })

  res.status(200).respond(expectations, ExpectationSerializer)

}

export default listRoute
