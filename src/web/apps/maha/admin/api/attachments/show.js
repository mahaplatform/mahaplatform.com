import Attachment from '../../../models/attachment'

const showRoute = async (req, res) => {

  const attachments = await Attachment.scope({
    team: req.team
  }).where({
    attachable_type: req.params.attachable_type,
    attachable_id: req.params.attachable_id
  }).fetchAll({
    withRelated: ['asset.source'],
    transacting: req.trx
  })

  const data = attachments.map(attachment => {
    return attachment.toJSON()
  })

  res.status(200).respond(data)

}

export default showRoute
