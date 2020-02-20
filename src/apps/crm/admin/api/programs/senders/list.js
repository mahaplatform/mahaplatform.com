import SenderSerializer from '../../../../serializers/sender_serializer'
import { checkProgramAccess } from '../../../../services/programs'
import Sender from '../../../../models/sender'

const listRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit','view']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const senders = await Sender.filter({
    scope: (qb) => {
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_senders.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('crm_senders.team_id', req.team.get('id'))
      qb.where('crm_senders.program_id', req.params.program_id)
    },
    filter: req.query.$filter,
    filterParams: ['is_verified'],
    searchParams: ['name','email']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(senders, SenderSerializer)

}

export default listRoute
