import GenerateScreenshotQueue from '../../../../queues/generate_screenshot_queue'
import TemplateSerializer from '../../../../serializers/template_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import socket from '../../../../../../core/services/routes/emitter'
import { checkProgramAccess } from '../../../../services/programs'
import Template from '../../../../models/template'

const updateRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const template = await Template.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('program_id', req.params.program_id)
    qb.where('id', req.params.id)
    qb.whereNull('crm_templates.deleted_at')
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!template) return res.status(404).respond({
    code: 404,
    message: 'Unable to load template'
  })

  await template.save({
    has_preview: false,
    ...whitelist(req.body, ['title','config'])
  }, {
    transacting: req.trx
  })

  await GenerateScreenshotQueue.enqueue(req, {
    template_id: template.get('id')
  })

  await activity(req, {
    story: 'updated {object}',
    object: template
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}`
  ])

  res.status(200).respond(template, TemplateSerializer)

}

export default updateRoute
