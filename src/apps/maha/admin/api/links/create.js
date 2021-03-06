import LinkSerializer from '@apps/maha/serializers/link_serializer'
import { findOrCreateByUrl } from '@apps/maha/services/links'

const showRoute = async (req, res) => {

  const link = await findOrCreateByUrl(req, req.body.url)

  if(!link) return res.status(404).respond({
    code: 404,
    message: 'Unable to load link'
  })

  await res.status(200).respond(link, LinkSerializer)

}

export default showRoute
