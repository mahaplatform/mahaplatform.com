import ExpectationSerializer from '../../../../serializers/expectation_serializer'
import Expectation from '../../../../models/expectation'

const listRoute = async (req, res) => {

  const expectations = await Expectation.scope({
    team: req.team
  }).query(qb => {
    qb.where('competencies_expectations.classification_id', req.params.classification_id)
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['competency'],
    transacting: req.trx
  })

  res.status(200).respond(expectations, ExpectationSerializer)

}

export default listRoute
