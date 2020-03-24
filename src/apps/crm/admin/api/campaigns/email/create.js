import EmailCampaignSerializer from '../../../../serializers/email_campaign_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import generateCode from '../../../../../../core/utils/generate_code'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import EmailCampaign from '../../../../models/email_campaign'
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

  const email_campaign = await EmailCampaign.forge({
    team_id: req.team.get('id'),
    code,
    status: 'draft',
    program_id: program.get('id'),
    to: {
      criteria: req.body.to
    },
    ...whitelist(req.body, ['title','purpose']),
    config: {
      settings: {
        sender_id: req.body.sender_id,
        subject: req.body.subject,
        reply_to: req.body.reply_to,
        preview_text: req.body.subject
      },
      page: {
        background_color: '#DFDFDF',
        p_font_size: 12
      },
      header: {
        blocks: [
          {
            type: 'web',
            text: '<p>Not displaying correctly? <a href="<%- email.web_link %>">View in browser</a></p>',
            padding: 8,
            p_font_size: 12,
            p_text_align: 'center',
            p_line_height: 1.5
          }
        ]
      },
      body: {
        blocks: [
          {
            type: 'text',
            content_0: '<p>Messenger bag portland adaptogen food truck pabst, la croix pug vinyl mumblecore chartreuse. Art party schlitz portland, try-hard semiotics tumblr green juice gentrify letterpress tilde gochujang whatever helvetica tote bag. Locavore quinoa man braid cred selvage chambray. Post-ironic everyday carry kale chips umami woke polaroid, meggings organic pork belly air plant.</p>',
            padding: 16
          }
        ],
        background_color: '#FFFFFF'
      },
      footer: {
        blocks: [
          {
            type: 'preferences',
            text: '<p>This email was sent to <strong><%- contact.email %></strong>. If you would like to control how much email you recieve from us, you can <a href="<%- email.preferences_link %>">adjust your preferences</a></p>',
            padding: 8,
            p_font_size: 12,
            p_text_align: 'center',
            p_line_height: 1.5
          }
        ]
      }
    }
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: email_campaign
  })

  await activity(req, {
    story: 'created {object}',
    object: email_campaign
  })

  await socket.refresh(req, [
    '/admin/crm/campaigns/email'
  ])

  res.status(200).respond(email_campaign, EmailCampaignSerializer)

}

export default createRoute
