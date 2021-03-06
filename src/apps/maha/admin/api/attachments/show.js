import AttachmentSerializer from '@apps/maha/serializers/attachment_serializer'
import Attachment from '@apps/maha/models/attachment'

const showRoute = async (req, res) => {

  const attachment = await Attachment.query(qb => {
    qb.where('attachable_type', req.params.attachable_type)
    qb.where('attachable_id', req.params.attachable_id)
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['asset'],
    transacting: req.trx
  })

  if(!attachment) return res.status(404).json({
    code: 404,
    message: 'Unable to find attachment'
  })

  await res.status(200).respond(attachment, AttachmentSerializer)

}

export default showRoute
