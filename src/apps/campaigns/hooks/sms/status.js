import WorkflowEnrollment from '@apps/automation/models/enrollment'
import { executeWorkflow } from '@apps/automation/services/workflows'
import MahaPhoneNumber from '@apps/maha/models/phone_number'
import socket from '@core/services/routes/emitter'
import PhoneNumber from '@apps/crm/models/phone_number'
import moment from 'moment'

const status = async (req, { sms, status, error_code }) => {

  const maha_phone_number = await MahaPhoneNumber.query(qb => {
    qb.whereRaw('number =? or number=?', [
      sms.related('to').get('number'),
      sms.related('from').get('number')
    ])
  }).fetch({
    transacting: req.trx
  })

  const phone_number = await PhoneNumber.query(qb => {
    qb.whereRaw('number =? or number=?', [
      sms.related('to').get('number'),
      sms.related('from').get('number')
    ])
  }).fetch({
    transacting: req.trx
  })

  if(error_code) {
    await phone_number.save({
      undelivered_count: parseInt(phone_number.get('undelivered_count')) + (error_code !== 30006 ? 1 : 0),
      can_text: phone_number.get('undelivered_count') >= 2 || error_code === 30006 ? false : phone_number.get('can_text')
    }, {
      transacting: req.trx,
      patch: true
    })
    return
  }

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.innerJoin('campaigns_sms_campaigns', 'campaigns_sms_campaigns.id', 'automation_enrollments.sms_campaign_id')
    qb.where('automation_enrollments.phone_number_id', maha_phone_number.get('id'))
    qb.where('automation_enrollments.contact_id', phone_number.get('contact_id'))
    qb.whereNot('automation_enrollments.status', 'completed')
    qb.whereRaw('automation_enrollments.created_at >= ?', moment().subtract(2, 'hours'))
  }).fetch({
    transacting: req.trx
  })

  if(!enrollment) return

  await executeWorkflow(req, {
    enrollment_id: enrollment.get('id')
  })

  await socket.refresh(req, [
    `/admin/campaigns/sms/${enrollment.get('sms_campaign_id')}`,
    `/admin/campaigns/sms/${enrollment.get('sms_campaign_id')}/enrollments`,
    `/admin/campaigns/sms/${enrollment.get('sms_campaign_id')}/enrollments/${enrollment.get('id')}`
  ])

}

export default status
