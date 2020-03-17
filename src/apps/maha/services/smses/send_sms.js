import SMSAttachment from '../../models/sms_attachment'
import SendSMSQueue from '../../queues/send_sms_queue'
import { findOrCreateNumber } from '../numbers'
import SMS from '../../models/sms'
import queueSMS from './queue_sms'
import ejs from 'ejs'

const sendSMS = async (req, params) => {

  const { team_id, from, to, body, asset_ids, sid, data, queue } = params

  const from_number = await findOrCreateNumber(req, {
    number: from
  })

  const to_number = await findOrCreateNumber(req, {
    number: to
  })

  const sms = await SMS.forge({
    team_id: team_id || req.team.get('id'),
    from_id: from_number.get('id'),
    to_id: to_number.get('id'),
    direction: 'outbound',
    body: data ? ejs.render(body, data) : body,
    num_media: asset_ids ? asset_ids.length : 0,
    status: 'queued',
    sid
  }).save(null, {
    transacting: req.trx
  })

  if(asset_ids) {
    await Promise.map(asset_ids, async(asset_id) => {
      await SMSAttachment.forge({
        team_id: req.team.get('id'),
        sms_id: sms.get('id'),
        asset_id
      }).save(null, {
        transacting: req.trx
      })
    })
  }

  if(queue === false) {
    await queueSMS(req, {
      sms_id: sms.get('id')
    })
  } else {
    await SendSMSQueue.enqueue(req, {
      sms_id: sms.get('id')
    })
  }

  return sms

}

export default sendSMS
