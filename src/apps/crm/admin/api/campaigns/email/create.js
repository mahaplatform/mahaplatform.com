import EmailCampaignSerializer from '../../../../serializers/email_campaign_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import generateCode from '../../../../../../core/utils/generate_code'
import socket from '../../../../../../core/services/routes/emitter'
import EmailCampaign from '../../../../models/email_campaign'
import Workflow from '../../../../models/workflow'
import Program from '../../../../models/program'

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
    table: 'crm_email_campaigns'
  })

  const campaign = await EmailCampaign.forge({
    team_id: req.team.get('id'),
    code,
    status: 'draft',
    program_id: program.get('id'),
    ...whitelist(req.body, ['title','purpose']),
    config: {
      blocks: [
        {
          type: 'web',
          text: '<p>Not displaying correctly? <a href="<%- email.web_link %>">View in browser</a></p>',
          padding: 8,
          font_size: 12,
          text_align: 'center',
          line_height: 1.5
        }, {
          type: 'text',
          content_0: '<p>lalala</p>',
          padding: 16
        }, {
          type: 'preferences',
          text: '<p>This email was sent to <strong><%- contact.email %></strong>. If you would like to control how much email you recieve from us, you can <a href="<%- email.preferences_link %>">adjust your preferences</a></p>',
          padding: 8,
          font_size: 12,
          text_align: 'center',
          line_height: 1.5
        }
      ],
      settings: {
        sender_id: req.body.sender_id,
        subject: req.body.subject,
        reply_to: req.body.reply_to,
        preview_text: 'Thank you for filling out our form'
      }
    }
  }).save(null, {
    transacting: req.trx
  })

  const workflowCode = await generateCode(req, {
    table: 'crm_workflows'
  })

  await Workflow.forge({
    team_id: req.team.get('id'),
    email_campaign_id: campaign.get('id'),
    program_id: program.get('id'),
    title: 'Email Workflow',
    code: workflowCode,
    status: 'active',
    config: {
      steps: []
    }
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: campaign
  })

  await socket.refresh(req, [
    '/admin/crm/campaigns'
  ])

  res.status(200).respond(campaign, EmailCampaignSerializer)

}

export default createRoute
