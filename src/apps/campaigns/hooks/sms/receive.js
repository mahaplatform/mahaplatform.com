import { executeEnrollment } from '@apps/automation/services/workflows'
import { getEnrollment } from '@apps/campaigns/services/sms_campaigns'
import socket from '@core/services/routes/emitter'
import moment from 'moment'
import _ from 'lodash'

const receiveHook = async (req, { from, sms, phone_number, twiml }) => {

  await sms.save({
    program_id: phone_number.related('program').get('id'),
    phone_number_id: from.get('id')
  }, {
    transacting: req.trx,
    patch: true
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${phone_number.related('program').get('id')}/channels/sms/${from.get('id')}/smses`
  ])

  const enrollment = await getEnrollment(req, {
    from,
    phone_number,
    sms
  })

  if(!enrollment) return

  if(_.includes(['stop','stopall','unsubscribe','cancel','end','quit'], sms.get('body').toLowerCase())) {
    return await enrollment.save({
      was_opted_out: true,
      status: 'lost',
      unenrolled_at: moment()
    }, {
      transacting: req.trx,
      patch: true
    })
  }

  await executeEnrollment(req, {
    enrollment_id: enrollment.get('id'),
    state: enrollment.get('next')
  })

}

export default receiveHook
