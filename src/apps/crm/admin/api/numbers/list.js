import NumberSerializer from '../../../serializers/number_serializer'
import Number from '../../../models/number'

const listRoute = async (req, res) => {

  const numbers = await Number.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
    filterParams: ['program_id']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(numbers, NumberSerializer)

}

export default listRoute
