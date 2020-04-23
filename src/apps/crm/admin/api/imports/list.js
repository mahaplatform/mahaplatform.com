import ImportSerializer from '../../../../maha/serializers/import_serializer'
import Import from '../../../../maha/models/import'

const listRoute = async (req, res) => {

  const imports = await Import.filterFetch({
    scope: (qb) => {
      qb.select('maha_imports.*','maha_import_counts.*')
      qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
      qb.innerJoin('maha_users', 'maha_users.id', 'maha_imports.user_id')
      qb.joinRaw('inner join crm_programs on crm_programs.id=maha_imports.program_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('maha_imports.object_type', 'crm_contacts')
      qb.where('maha_imports.team_id', req.team.get('id'))
      qb.orderBy('created_at','desc')
    },
    filter: {
      params: req.query.$filter,
      search: ['maha_users.first_name','maha_users.last_name','maha_imports.service']
    },
    page: req.query.$page,
    withRelated: ['asset','program','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(imports, ImportSerializer)

}

export default listRoute
