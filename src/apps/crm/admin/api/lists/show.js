import ListSerializer from '../../../serializers/list_serializer'
import List from '../../../models/list'

const showRoute = async (req, res) => {

  const list = await List.query(qb => {
    qb.joinRaw('inner join crm_programs on crm_programs.id=crm_lists.program_id')
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_lists.team_id', req.team.get('id'))
    qb.where('crm_lists.id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  res.status(200).respond(list, ListSerializer)

}

export default showRoute
