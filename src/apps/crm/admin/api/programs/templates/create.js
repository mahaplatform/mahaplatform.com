import GenerateScreenshotQueue from '@apps/maha/queues/generate_screenshot_queue'
import TemplateSerializer from '@apps/crm/serializers/template_serializer'
import { getDefaultConfig } from '@apps/automation/services/email'
import { checkProgramAccess } from '@apps/crm/services/programs'
import { activity } from '@core/services/routes/activities'
import generateCode from '@core/utils/generate_code'
import socket from '@core/services/routes/emitter'
import Template from '@apps/crm/models/template'

const getConfig = async (req, { config, program_id, template_id }) => {

  if(config) return config

  if(template_id) {

    const starter = await Template.query(qb => {
      qb.whereRaw('team_id is null or (team_id=? and program_id=?)', [req.team.get('id'), program_id])
      qb.where('id', template_id)
    }).fetch({
      transacting: req.trx
    })

    return starter.get('config')
  }

  return getDefaultConfig()

}

const createRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const preexisting = await Template.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('program_id', req.params.program_id)
    qb.where('title', req.body.title)
  }).fetch({
    transacting: req.trx
  })

  if(preexisting)  return res.status(422).respond({
    code: 322,
    message: 'Unable to save',
    errors: {
      title: ['A template with this title already exists']
    }
  })

  const config = await getConfig(req, {
    program_id: req.params.program_id,
    template_id: req.body.template_id,
    config: req.body.config
  })

  const code = await generateCode(req, {
    table: 'crm_templates'
  })

  const template = await Template.forge({
    team_id: req.team.get('id'),
    program_id: req.params.program_id,
    title: req.body.title,
    code,
    config
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
