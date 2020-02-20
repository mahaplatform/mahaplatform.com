import ImportSerializer from '../../../serializers/import_serializer'
import Import from '../../../models/import'

const listRoute = async (req, res) => {

  const imports = await Import.filter({
    scope: qb => {
      qb.select('maha_imports.*','maha_import_counts.*')
      qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
      qb.where('team_id', req.team.get('id'))
      qb.where('user_id', req.user.get('id'))
    },
    filter: req.query.$filter,
    filterParams: ['object_type','stage'],
    sort: req.query.$sort,
    defaultSort: '-created_at'
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['asset','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(imports, ImportSerializer)

}

export default listRoute
