import LinkSerializer from '../../../serializers/link_serializer'
import Link from '../../../models/link'
import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  const link = await Link.where({ id: req.params.id }).fetch({ transacting: trx })

  return link

}

const linkRoute = new Route({
  method: 'get',
  path: '/:id',
  processor,
  serializer: LinkSerializer
})

export default linkRoute
