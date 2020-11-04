import PhoneNumberSerializer from '../../../../../team/serializers/phone_number_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import VoiceCampaign from '../../../../../campaigns/models/voice_campaign'
import SMSCampaign from '../../../../../campaigns/models/sms_campaign'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import { checkProgramAccess } from '../../../../services/programs'
import twilio from '../../../../../../core/services/twilio'
import Program from '../../../../models/program'
import moment from 'moment'

const createRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const program = await Program.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.program_id)
  }).fetch({
    withRelated: ['phone_number'],
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load program'
  })

  if(!program.get('phone_number_id')) return res.status(404).respond({
    code: 422,
    message: 'This program doesnt have a phone number'
  })

  const phone_number = program.related('phone_number')

  await twilio.incomingPhoneNumbers(phone_number.get('sid')).remove()

  await phone_number.save({
    released_at: moment()
  }, {
    transacting: req.trx,
    patch: true
  })

  await program.save({
    phone_number_id: null
  }, {
    transacting: req.trx,
    patch: true
  })

  const voice_campaigns = await VoiceCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('phone_number_id', phone_number.get('id'))
    qb.where('direction', 'inbound')
  }).fetchAll({
    transacting: req.trx
  })

  await Promise.mapSeries(voice_campaigns, async (voice_campaign) => {

    await voice_campaign.save({
      status: 'retired'
    }, {
      transacting: req.trx,
      patch: true
    })

    await audit(req, {
      story: 'retired',
      auditable: voice_campaign
    })

    await socket.refresh(req, [
      '/admin/campaigns/voice/inbound',
      `/admin/campaigns/voice/${voice_campaign.id}`
    ])

  })

  const sms_campaigns = await SMSCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('phone_number_id', phone_number.get('id'))
    qb.where('direction', 'inbound')
  }).fetchAll({
    transacting: req.trx
  })

  await Promise.mapSeries(sms_campaigns, async (sms_campaign) => {

    await sms_campaign.save({
      status: 'retired'
    }, {
      transacting: req.trx,
      patch: true
    })

    await audit(req, {
      story: 'retired',
      auditable: sms_campaign
    })

    await socket.refresh(req, [
      '/admin/campaigns/sms/inbound',
      `/admin/campaigns/sms/${sms_campaign.id}`
    ])

  })

  await socket.refresh(req, [
    '/admin/team/phone_numbers',
    `/admin/crm/programs/${program.id}`
  ])

  await activity(req, {
    story: 'released {object}',
    object: phone_number
  })

  res.status(200).respond(phone_number, PhoneNumberSerializer)

}

export default createRoute
