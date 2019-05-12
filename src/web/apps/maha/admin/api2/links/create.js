import LinkSerializer from '../../../serializers/link_serializer'
import { findOrCreateByUrl } from '../../../services/links'

const showRoute = async (req, res) => {

  const link = await findOrCreateByUrl(req.body.url, res.trx)

  res.status(200).respond(link, (link) => LinkSerializer(req, req.trx, link))

}

export default showRoute
