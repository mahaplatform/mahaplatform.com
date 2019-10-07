import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import TemplateSerializer from '../../../serializers/template_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Template from '../../../models/template'

const createRoute = async (req, res) => {

  const template = await Template.forge({
    team_id: req.team.get('id'),
    program_id: req.params.program_id,
    ...whitelist(req.body, ['title','type','parent_id'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: template
  })

  await socket.refresh(req, [
    `/api/admin/crm/templates`
  ])

  res.status(200).respond(template, TemplateSerializer)

}

export default createRoute
