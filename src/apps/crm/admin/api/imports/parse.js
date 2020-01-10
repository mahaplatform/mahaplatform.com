import ImportSerializer from '../../../../maha/serializers/import_serializer'
import Import from '../../../../maha/models/import'

const parseRoute = async (req, res) => {

  const _import = await Import.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    asset_id: req.body.asset_id,
    object_type: 'crm_contacts',
    headers: req.body.parse.headers,
    delimiter: req.body.parse.delimiter,
    mapping: req.body.mapping,
    stage: 'configuring'
  }).save(null, {
    transacting: req.trx
  })

  res.status(200).respond(_import, ImportSerializer)

}

export default parseRoute
