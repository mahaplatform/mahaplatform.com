import AttachmentSerializer from '../../../serializers/attachment_serializer'
import Attachment from '../../../models/attachment'

const showRoute = async (req, res) => {

  const attachment = await Attachment.scope(qb => {
    qb.where('attachable_type', req.params.attachable_type)
    qb.where('attachable_id', req.params.attachable_id)
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['asset.source'],
    transacting: req.trx
  })

  res.status(200).respond(attachment, AttachmentSerializer)

}

export default showRoute
