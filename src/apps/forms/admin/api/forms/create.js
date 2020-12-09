import { createConfirmationWorkflow } from '@apps/automation/services/workflows'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import generateCode from '@core/utils/generate_code'
import FormSerializer from '@apps/forms/serializers/form_serializer'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import { updateAlias } from '@apps/maha/services/aliases'
import Program from '@apps/crm/models/program'
import Form from '@apps/forms/models/form'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.whereIn('crm_program_user_access.type', ['manage','edit'])
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', req.body.program_id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const code = await generateCode(req, {
    table: 'forms_forms'
  })

  const generateFieldCode = () => {
    return _.random(100000, 999999).toString(36)
  }

  const form = await Form.forge({
    team_id: req.team.get('id'),
    code,
    program_id: program.get('id'),
    ...whitelist(req.body, ['title','permalink']),
    config: {
      fields: [
        { label: 'First Name', name: { value: 'First Name', token: 'first_name' }, code: generateFieldCode(), required: true, type: 'contactfield', placeholder: 'Enter First Name', contactfield: { label: 'First Name', name: 'first_name', type: 'textfield' }, overwrite: true },
        { label: 'Last Name', name: { value: 'Last Name', token: 'last_name' }, code: generateFieldCode(), required: true, type: 'contactfield', placeholder: 'Enter Last Name', contactfield: { label: 'Last Name', name: 'last_name', type: 'textfield' }, overwrite: true },
        { label: 'Email', name: { value: 'Email', token: 'email' }, code: generateFieldCode(), required: true, type: 'contactfield', placeholder: 'Enter Email', contactfield: { label: 'Email', name: 'email', type: 'emailfield' }, overwrite: true }
      ],
      body: {
        background_color: '#FFFFFF',
        button_text: 'Submit'
      },
      confirmation: {
        strategy: 'message',
        message: 'Thank You!'
      },
      limits: {},
      page: {
        background_color: '#EEEEEE'
      },
      security: {
        captcha: true
      },
      seo: {
        title: req.body.title,
        description: ''
      }
    }
  }).save(null, {
    transacting: req.trx
  })

  await updateAlias(req, {
    permalink: req.body.permalink,
    src: `/forms/${req.body.permalink}`,
    destination: `/forms/forms/${form.get('code')}`
  })

  await audit(req, {
    story: 'created',
    auditable: form
  })

  await createConfirmationWorkflow(req,  {
    form,
    trigger_type: 'response_created',
    program_id: program.get('id'),
    ...req.body.confirmation
  })

  await activity(req, {
    story: 'created {object}',
    object: form
  })

  await socket.refresh(req, [
    '/admin/forms/forms'
  ])

  res.status(200).respond(form, FormSerializer)

}

export default createRoute
