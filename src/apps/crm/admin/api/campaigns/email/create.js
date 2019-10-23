import EmailCampaignSerializer from '../../../../serializers/email_campaign_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import generateCode from '../../../../../../core/utils/generate_code'
import socket from '../../../../../../core/services/routes/emitter'
import EmailCampaign from '../../../../models/email_campaign'
import Template from '../../../../models/template'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'crm_email_campaigns'
  })

  const template = req.body.template_id ? await Template.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.body.template_id)
  }).fetch({
    transacting: req.trx
  }) : null

  const campaign = await EmailCampaign.forge({
    team_id: req.team.get('id'),
    code,
    status: 'draft',
    config: template ? template.get('config') : null,
    ...whitelist(req.body, ['program_id','sender_id','title','reply_to','to','subject'])
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
