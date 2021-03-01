import ListSerializer from '@apps/crm/serializers/list_serializer'
import List from '@apps/crm/models/list'

const listRoute = async (req, res) => {

  const lists = await List.filterFetch({
    scope: (qb) => {
      qb.select('crm_lists.*','crm_list_totals.*')
      qb.innerJoin('crm_list_totals', 'crm_list_totals.list_id', 'crm_lists.id')
      qb.joinRaw('inner join crm_programs on crm_programs.id=crm_lists.program_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('crm_lists.team_id', req.team.get('id'))
      qb.whereNull('deleted_at')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['program_id']
    },
    sort: {
      params: req.params.$sort,
      defaults: ['title']
    },
    page: req.query.$page,
    withRelated: ['program.logo'],
    transacting: req.trx
  })

  res.status(200).respond(lists, ListSerializer)

}

export default listRoute
