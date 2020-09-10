import ListSerializer from '../../../../serializers/list_serializer'
import { checkProgramAccess } from '../../../../services/programs'
import List from '../../../../models/list'

const listRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit','view']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const lists = await List.filterFetch({
    scope: (qb) => {
      qb.select('crm_lists.*','crm_list_totals.*')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_lists.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.innerJoin('crm_list_totals', 'crm_list_totals.list_id', 'crm_lists.id')
      qb.where('crm_lists.program_id', req.params.program_id)
      qb.where('crm_lists.team_id', req.team.get('id'))
      qb.whereNull('deleted_at')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    withRelated: ['program'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(lists, ListSerializer)

}

export default listRoute
