import LinkSerializer from '../../../serializers/link_serializer'
import { findOrCreateByUrl } from '../../../services/links'

const showRoute = async (req, res) => {

  const link = await findOrCreateByUrl(req.body.url, res.trx)

  res.status(200).respond(link, (link) => {
    return LinkSerializer(req, link)
  })

}

export default showRoute
