import SMSAttachment from '@apps/maha/models/sms_attachment'
import SendSMSQueue from '@apps/maha/queues/send_sms_queue'
import SMSBlacklist from '@apps/maha/models/sms_blacklist'
import { findOrCreateNumber } from '../numbers'
import SMS from '@apps/maha/models/sms'
import queueSMS from './queue_sms'
import ejs from 'ejs'

const sendSMS = async (req, params) => {

  const { team_id, user_id, from, to, body, asset_ids, sid, data, queue } = params

  const from_number = await findOrCreateNumber(req, {
    number: from
  })

  const to_number = await findOrCreateNumber(req, {
    number: to
  })

  const blacklist = await SMSBlacklist.query(qb => {
    qb.where('from_number_id', from_number.get('id'))
    qb.where('to_number_id', to_number.get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(blacklist) throw new Error('This number has been blacklisted')

  const sms = await SMS.forge({
    team_id: team_id || req.team.get('id'),
    user_id,
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
