import SMSAttachment from '../models/sms_attachment'
import SendSMSQueue from '../queues/send_sms_queue'
import twilio from '../../../core/services/twilio'
import { findOrCreateNumber } from './numbers'
import SMS from '../models/sms'
import moment from 'moment'

export const createSMS = async (req, params) => {

  const from = await findOrCreateNumber(req, {
    number: params.from
  })

  const to = await findOrCreateNumber(req, {
    number: params.to
  })

  const sms = await SMS.forge({
    team_id: req.team.get('id'),
    from_id: from.get('id'),
    to_id: to.get('id'),
    type: 'outgoing',
    body: params.body
  }).save(null, {
    transacting: req.trx
  })

  if(params.asset_ids) {
    await Promise.map(params.asset_ids, async(asset_id) => {
      await SMSAttachment.forge({
        team_id: req.team.get('id'),
        sms_id: sms.get('id'),
        asset_id
      }).save(null, {
        transacting: req.trx
      })
    })
  }

  await SendSMSQueue.enqueue(req, {
    id: sms.get('id')
  })

  return sms

}

export const sendSMS = async (req, { id }) => {

  const sms = await SMS.query(qb => {
    qb.where('id', id)
  }).fetch({
    withRelated: ['to','from','attachments.asset'],
    transacting: req.trx
  })

  try {

    const result = await twilio.messages.create({
      from: sms.related('from').get('number'),
      to: sms.related('to').get('number'),
      body: sms.get('body'),
      mediaUrl: sms.related('attachments').map(attachment => {
        return attachment.related('asset').get('signed_url')
      }),
      StatusCallbackMethod: 'POST',
      statusCallback: `${process.env.TWIML_HOST}/sms/feedback`
    })

    await sms.save({
      sid: result.sid,
      status: 'queued',
      sent_at: moment()
    }, {
      transacting: req.trx
    })

  } catch(err) {

    await sms.save({
      status: 'failed'
    }, {
      transacting: req.trx
    })

    throw(err)

  }

}

export const updateSMS = async (req, { price, sid, status }) => {

  const sms = await SMS.query(qb => {
    qb.where('sid', sid)
  }).fetch({
    transacting: req.trx
  })

  await sms.save({
    price,
    status
  }, {
    transacting: req.trx
  })

}
