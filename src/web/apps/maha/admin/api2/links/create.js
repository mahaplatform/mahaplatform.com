import LinkSerializer from '../../../serializers/link_serializer'
import { findOrCreateByUrl } from '../../../services/links'

const showRoute = async (req, res) => {

  const link = await findOrCreateByUrl(req.body.url, res.trx)

  const data = LinkSerializer(req, req.trx, link)

  res.status(200).respond(data)

}

export default showRoute
