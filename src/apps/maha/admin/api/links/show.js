import LinkSerializer from '@apps/maha/serializers/link_serializer'
import Link from '@apps/maha/models/link'

const showRoute = async (req, res) => {

  const link = await Link.where({
    id: req.params.id
  }).fetch({
    transacting: req.trx
  })

  await res.status(200).respond(link, LinkSerializer)

}

export default showRoute
