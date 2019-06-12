import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import generateCode from '../../../../../core/utils/generate_code'
import TypeSerializer from '../../../serializers/type_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Field from '../../../../maha/models/field'
import Type from '../../../models/type'

const createRoute = async (req, res) => {

  const type = await Type.forge({
    team_id: req.team.get('id'),
    site_id: req.params.site_id,
    ...whitelist(req.body, ['title','description'])
  }).save(null, {
    transacting: req.trx
  })

  await Field.forge({
    team_id: req.team.get('id'),
    parent_type: 'sites_types',
    parent_id: type.get('id'),
    code: generateCode(),
    delta: 0,
    label: 'Title',
    name: 'title',
    type: 'textfield',
    config: {
      required: true
    }
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: type
  })

  await socket.message(req, {
    channel: 'user',
    action: 'session'
  })

  await socket.refresh(req, [
    `/admin/sites/sites/${req.params.site_id}`
  ])

  res.status(200).respond(type, (type) => {
    return TypeSerializer(req, req.trx, type)
  })

}

export default createRoute
