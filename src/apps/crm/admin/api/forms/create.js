import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import generateCode from '../../../../../core/utils/generate_code'
import FormSerializer from '../../../serializers/form_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Template from '../../../models/template'
import Program from '../../../models/program'
import Email from '../../../models/email'
import Form from '../../../models/form'
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
    table: 'crm_forms'
  })

  const generateFieldCode = () => {
    return _.random(100000, 999999).toString(36)
  }

  const form = await Form.forge({
    team_id: req.team.get('id'),
    status: 'draft',
    code,
    program_id: program.get('id'),
    ...whitelist(req.body, ['title']),
    config: {
      fields: [
        { label: 'First Name', name: { value: 'First Name', token: 'first_name' }, code: generateFieldCode(), required: true, type: 'contactfield', contactfield: { label: 'First Name', name: 'first_name', type: 'textfield'} },
        { label: 'Last Name', name: { value: 'Last Name', token: 'last_name' }, code: generateFieldCode(), required: true, type: 'contactfield', contactfield: { label: 'Last Name', name: 'last_name', type: 'textfield'} },
        { label: 'Email', name: { value: 'Email', token: 'email' }, code: generateFieldCode(), required: true, type: 'contactfield', contactfield: { label: 'Email', name: 'email', type: 'textfield'} }
      ],
      settings: {
        captcha: true,
        confirmation_strategy: 'message',
        confirmation_message: 'Thank You!',
        button_text: 'Submit'
      },
      page: {
        background_color: '#EEEEEE',
        form_background_color: '#FFFFFF'
      }
    }
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: form
  })

  const template = req.body.template_id ? await Template.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.body.template_id)
  }).fetch({
    transacting: req.trx
  }) : null

  const emailCode = await generateCode(req, {
    table: 'crm_emails'
  })

  const email = await Email.forge({
    team_id: req.team.get('id'),
    form_id: form.get('id'),
    sender_id: req.body.sender_id,
    title: 'Confirmation',
    code: emailCode,
    subject: req.body.subject,
    reply_to: req.body.reply_to,
    config: template ? template.get('config') : {
      sections: [{
        label: 'Header',
        blocks: []
      },{
        label: 'Body',
        blocks: [
          {
            type: 'text',
            content_0: '<p>&lt;%= contact.first_name %&gt;,</p><p>Thank you for filling out our form</p>',
            padding: 16
          }
        ]
      }, {
        label: 'Footer',
        blocks: []
      }],
      settings: {
        sender_id: req.body.sender_id,
        subject: req.body.subject,
        reply_to: req.body.reply_to
      }
    }
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: email
  })

  await activity(req, {
    story: 'created {object}',
    object: form
  })

  await socket.refresh(req, [
    '/admin/crm/forms'
  ])

  res.status(200).respond(form, FormSerializer)

}

export default createRoute
