import LinkSerializer from '../../../serializers/link_serializer'
import { findOrCreateByUrl } from '../../../services/links'
import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  const link = await findOrCreateByUrl(req.body.url, trx)

  return link

}

const linkRoute = new Route({
  method: 'post',
  path: '',
  processor,
  serializer: LinkSerializer
})

export default linkRoute
