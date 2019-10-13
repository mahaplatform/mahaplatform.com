import SMSAttachment from '../models/sms_attachment'
import SendSMSQueue from '../queues/send_sms_queue'
import twilio from '../../../core/services/twilio'
import { findOrCreateNumber } from './numbers'
import { createAssetFromUrl } from './assets'
import SMS from '../models/sms'
import moment from 'moment'

export const receiveSMS = async (req, params) => {

  const from = await findOrCreateNumber(req, {
    number: params.from
  })

  const to = await findOrCreateNumber(req, {
    number: params.to
  })

  const { body, sid, incoming } = params

  const num_media = parseInt(incoming.NumMedia)

  const sms = await SMS.forge({
    team_id: params.team_id,
    from_id: from.get('id'),
    to_id: to.get('id'),
    direction: 'inbound',
    num_media,
    body,
    price: num_media > 0 ? num_media * 0.01 : 0.0075,
    sid,
    status: 'received',
    received_at: moment()
  }).save(null, {
    transacting: req.trx
  })

  if(num_media > 0) {
    await Promise.map(Array(num_media).fill(0), async(num, index) => {
      if(!incoming[`MediaUrl${index}`]) return
      const asset = await createAssetFromUrl(req, {
        url: incoming[`MediaUrl${index}`],
        team_id: params.team_id,
        user_id: null,
        source: 'sms'
      })
      await SMSAttachment.forge({
        team_id: params.team_id,
        sms_id: sms.get('id'),
        asset_id: asset.get('id')
      }).save(null, {
        transacting: req.trx
      })
    })
  }

  return sms

}

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
    direction: 'outbound',
    body: params.body,
    num_media: params.asset_ids ? params.asset_ids.length : 0,
    status: 'queued'
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
