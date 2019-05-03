import Attachment from '../../../models/attachment'
import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  const attachments = await Attachment.where({
    attachable_type: req.params.attachable_type,
    attachable_id: req.params.attachable_id
  }).fetchAll({
    withRelated: ['asset.source'],
    transacting: trx
  })

  return attachments

}

const attachmentsRoute = new Route({
  method: 'get',
  path: '/attachments/:attachable_type/:attachable_id',
  processor
})

export default attachmentsRoute
