import ImportItem from '@apps/maha/models/import_item'
import Import from '@apps/maha/models/import'

const showRoute = async (req, res) => {

  const _import = await Import.query(qb => {
    qb.select('maha_imports.*','maha_import_counts.*')
    qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
    qb.joinRaw('inner join crm_programs on crm_programs.id=maha_imports.program_id')
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('maha_imports.team_id', req.team.get('id'))
    qb.where('maha_imports.id', req.params.import_id)
  }).fetch({
    transacting: req.trx
  })

  if(!_import) return res.status(404).respond({
    code: 404,
    message: 'Unable to load import'
  })

  const item = await ImportItem.query(qb => {
    qb.where('import_id', _import.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  res.status(200).respond(item)

}

export default showRoute
