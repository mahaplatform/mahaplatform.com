import SMSCampaignSerializer from '@apps/campaigns/serializers/sms_campaign_serializer'
import { renderCampaign } from '@apps/campaigns/services/sms_campaigns'
import SMSCampaign from '@apps/campaigns/models/sms_campaign'
import { createVersion } from '@apps/maha/services/versions'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Program from '@apps/crm/models/program'
import { upload } from '@core/services/aws/s3'

const getKey = (campaign) => {
  if(campaign.get('direction') === 'outbound') {
    return `outbound/${campaign.get('code')}`
  } else {
    return `inbound/${campaign.related('phone_number').get('number').substr(1)}/${campaign.get('term')}`
  }
}

const createRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.whereIn('crm_program_user_access.type', ['manage','edit'])
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', req.body.program_id)
  }).fetch({
    withRelated: ['phone_number'],
    transacting: req.trx
  })

  if(!program) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const code = await generateCode(req, {
    table: 'crm_sms_campaigns'
  })

  const campaign = await SMSCampaign.forge({
    team_id: req.team.get('id'),
    code,
    status: 'draft',
    term: req.body.term ? req.body.term.toLowerCase() : null,
    program_id: program.get('id'),
    phone_number_id: program.get('phone_number_id'),
    ...whitelist(req.body, ['to','title','direction','purpose'])
  }).save(null, {
    transacting: req.trx
  })

  await campaign.load(['phone_number'], {
    transacting: req.trx
  })

  const version = await createVersion(req, {
    versionable_type: 'crm_sms_campaigns',
    versionable_id: campaign.id,
    key: 'config',
    value: { steps: [] }
  })

  const rendered = await renderCampaign(req, {
    config: version.get('value')
  })

  await upload(null, {
    acl: 'private',
    bucket: process.env.AWS_BUCKET,
    key: `twiml/sms/${getKey(campaign)}`,
    cache_control: 'max-age=0,no-cache',
    content_type: 'application/json',
    file_data: JSON.stringify(rendered)
  })

  await audit(req, {
    story: 'created',
    auditable: campaign
  })

  await activity(req, {
    story: 'created {object}',
    object: campaign
  })

  await socket.refresh(req, [
    `/admin/campaigns/sms/${campaign.get('direction')}`
  ])

  res.status(200).respond(campaign, SMSCampaignSerializer)

}

export default createRoute
