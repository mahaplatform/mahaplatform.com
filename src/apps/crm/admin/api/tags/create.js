import TagSerializer from '../../../serializers/tag_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Tag from '../../../models/tag'

const createRoute = async (req, res) => {

  const tag = await Tag.forge({
    team_id: req.team.get('id'),
    text: req.body.text
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/crm/tags'
  ])

  res.status(200).respond(tag, TagSerializer)

}

export default createRoute
