import NumberSerializer from '../../../../serializers/number_serializer'
import Number from '../../../../models/number'

const listRoute = async (req, res) => {

  const numbers = await Number.scope({
    team: req.team
  }).query(qb => {
    qb.where('program_id', req.params.program_id)
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(numbers, NumberSerializer)

}

export default listRoute
