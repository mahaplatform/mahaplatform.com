import WorkflowEnrollment from '../../models/workflow_enrollment'
import MahaPhoneNumber from '../../../maha/models/phone_number'
import socket from '../../../../core/services/routes/emitter'
import { executeWorkflow } from '../../services/workflows'
import PhoneNumber from '../../models/phone_number'
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
    qb.innerJoin('crm_sms_campaigns', 'crm_sms_campaigns.id', 'crm_workflow_enrollments.sms_campaign_id')
    qb.where('crm_workflow_enrollments.phone_number_id', maha_phone_number.get('id'))
    qb.where('crm_workflow_enrollments.contact_id', phone_number.get('contact_id'))
    qb.whereNot('crm_workflow_enrollments.status', 'completed')
    qb.whereRaw('crm_workflow_enrollments.created_at >= ?', moment().subtract(2, 'hours'))
  }).fetch({
    transacting: req.trx
  })

  if(!enrollment) return

  await executeWorkflow(req, {
    enrollment_id: enrollment.get('id')
  })

  await socket.refresh(req, [
    `/admin/crm/campaigns/sms/${enrollment.get('sms_campaign_id')}`,
    `/admin/crm/campaigns/sms/${enrollment.get('sms_campaign_id')}/enrollments`,
    `/admin/crm/campaigns/sms/${enrollment.get('sms_campaign_id')}/enrollments/${enrollment.get('id')}`
  ])

}

export default status
