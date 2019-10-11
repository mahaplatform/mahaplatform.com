import NumberSerializer from '../../../serializers/number_serializer'
import Number from '../../../../maha/models/number'

const listRoute = async (req, res) => {

  const numbers = await Number.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(numbers, NumberSerializer)

}

export default listRoute
