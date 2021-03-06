import SMSCampaignSerializer from '@apps/campaigns/serializers/sms_campaign_serializer'
import SMSCampaign from '@apps/campaigns/models/sms_campaign'
import { createVersion } from '@apps/maha/services/versions'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Program from '@apps/crm/models/program'

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

  await createVersion(req, {
    versionable_type: 'crm_sms_campaigns',
    versionable_id: campaign.id,
    key: 'config',
    value: { steps: [] }
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

  await res.status(200).respond(campaign, SMSCampaignSerializer)

}

export default createRoute
