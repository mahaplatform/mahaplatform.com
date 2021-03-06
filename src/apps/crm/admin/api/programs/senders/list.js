import SenderSerializer from '@apps/crm/serializers/sender_serializer'
import { checkProgramAccess } from '@apps/crm/services/programs'
import Sender from '@apps/crm/models/sender'

const listRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit','view']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const senders = await Sender.filterFetch({
    scope: (qb) => {
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_senders.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('crm_senders.team_id', req.team.get('id'))
      qb.where('crm_senders.program_id', req.params.program_id)
    },
    filter: {
      params: req.query.$filter,
      search: ['name','email']
    },
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  await res.status(200).respond(senders, SenderSerializer)

}

export default listRoute
