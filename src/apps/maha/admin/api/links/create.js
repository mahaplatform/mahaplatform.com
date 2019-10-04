import LinkSerializer from '../../../serializers/link_serializer'
import { findOrCreateByUrl } from '../../../services/links'

const showRoute = async (req, res) => {

  const link = await findOrCreateByUrl(req, req.body.url)

  res.status(200).respond(link, LinkSerializer)

}

export default showRoute
