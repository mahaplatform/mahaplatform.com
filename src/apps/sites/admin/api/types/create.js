import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import generateCode from '@core/utils/generate_code'
import TypeSerializer from '@apps/sites/serializers/type_serializer'
import socket from '@core/services/routes/emitter'
import Field from '@apps/maha/models/field'
import Type from '@apps/sites/models/type'
import pluralize from 'pluralize'

const createRoute = async (req, res) => {

  const type = await Type.forge({
    team_id: req.team.get('id'),
    site_id: req.params.site_id,
    title: req.body.title,
    name: pluralize.singular(req.body.title),
    ...whitelist(req.body, ['description'])
  }).save(null, {
    transacting: req.trx
  })

  const code = await generateCode(req, {
    table: 'maha_fields'
  })

  await Field.forge({
    team_id: req.team.get('id'),
    parent_type: 'sites_types',
    parent_id: type.get('id'),
    code,
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
    `/admin/sites/sites/${req.params.site_id}/types`,
    `/admin/sites/sites/${req.params.site_id}/types/${type.get('id')}`
  ])

  await res.status(200).respond(type, TypeSerializer)

}

export default createRoute
