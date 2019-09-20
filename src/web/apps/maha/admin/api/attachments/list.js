import AttachmentSerializer from '../../../serializers/attachment_serializer'
import Attachment from '../../../models/attachment'

const listRoute = async (req, res) => {

  const attachments = await Attachment.scope({
    team: req.team
  }).where(qb => {
    qb.where('attachable_type', req.params.attachable_type)
    qb.where('attachable_id', req.params.attachable_id)
  }).fetchAll({
    withRelated: ['asset.source'],
    transacting: req.trx
  })

  res.status(200).respond(attachments, AttachmentSerializer)

}

export default listRoute
