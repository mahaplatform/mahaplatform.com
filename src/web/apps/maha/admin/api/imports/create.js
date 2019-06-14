import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import ImportSerializer from '../../../serializers/import_serializer'
import Import from '../../../models/import'

const createRoute = async (req, res) => {

  const _import = await Import.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    ...whitelist(req.body, ['object_type','asset_id','stage','delimiter','headers','mapping','name','strategy'])
  }).save(null, {
    transacting: req.trx
  })

  await _import.load(['asset','user.photo'], {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: _import
  })

  res.status(200).respond(_import, (_import) => {
    return ImportSerializer(req, _import)
  })

}

export default createRoute
