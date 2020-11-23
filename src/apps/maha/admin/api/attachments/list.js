import AttachmentSerializer from '@apps/maha/serializers/attachment_serializer'
import Attachment from '@apps/maha/models/attachment'

const listRoute = async (req, res) => {

  const attachments = await Attachment.query(qb => {
    qb.where('attachable_type', req.params.attachable_type)
    qb.where('attachable_id', req.params.attachable_id)
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    withRelated: ['asset'],
    transacting: req.trx
  })

  res.status(200).respond(attachments, AttachmentSerializer)

}

export default listRoute
