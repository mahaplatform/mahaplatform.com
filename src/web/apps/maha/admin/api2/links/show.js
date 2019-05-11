import LinkSerializer from '../../../serializers/link_serializer'
import Link from '../../../models/link'

const showRoute = async (req, res) => {

  const link = await Link.where({
    id: req.params.id
  }).fetch({
    transacting: req.trx
  })

  const data = LinkSerializer(req, req.trx, link)

  res.status(200).respond(data)

}

export default showRoute
