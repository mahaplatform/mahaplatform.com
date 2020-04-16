import GenerateScreenshotQueue from '../../../../queues/generate_screenshot_queue'
import TemplateSerializer from '../../../../serializers/template_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import socket from '../../../../../../core/services/routes/emitter'
import { checkProgramAccess } from '../../../../services/programs'
import { getDefaultConfig } from '../../../../services/email'
import Template from '../../../../models/template'

const createRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const starter = req.body.template_id ? await Template.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('program_id', req.params.program_id)
    qb.where('id', req.body.template_id)
  }).fetch({
    transacting: req.trx
  }) : null

  const template = await Template.forge({
    team_id: req.team.get('id'),
    program_id: req.params.program_id,
    has_preview: false,
    title: req.body.title,
    config: starter ? starter.get('config') : getDefaultConfig()
  }).save(null, {
    transacting: req.trx
  })

  await GenerateScreenshotQueue.enqueue(req, {
    template_id: template.get('id')
  })

  await activity(req, {
    story: 'created {object}',
    object: template
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}`
  ])

  res.status(200).respond(template, TemplateSerializer)

}

export default createRoute
