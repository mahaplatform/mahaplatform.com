import SenderSerializer from '../../../../serializers/sender_serializer'
import { checkProgramAccess } from '../../../../services/programs'
import Sender from '../../../../models/sender'

const updateRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const sender = await Sender.query(qb => {
    qb.where('program_id', req.params.program_id)
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(sender, SenderSerializer)

}

export default updateRoute
