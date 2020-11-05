import { createAssetFromUrl } from '../services/assets'
import SendFaxQueue from '../queues/send_fax_queue'
import twilio from '@core/services/twilio'
import { findOrCreateNumber } from './numbers'
import Fax from '../models/fax'
import moment from 'moment'

export const createFax = async (req, params) => {

  const { status, sid } = params

  const from = await findOrCreateNumber(req, {
    number: params.from
  })

  const to = await findOrCreateNumber(req, {
    number: params.to
  })

  const fax = await Fax.forge({
    team_id: params.team_id || req.team.get('id'),
    from_id: from.get('id'),
    to_id: to.get('id'),
    direction: 'inbound',
    sid,
    status
  }).save(null, {
    transacting: req.trx
  })

  return fax

}

export const receiveFax = async (req, params) => {

  const { mediaUrl, num_pages, price, sid, status } = params

  const fax = await Fax.query(qb => {
    qb.where('sid', sid)
  }).fetch({
    transacting: req.trx
  })

  const asset = mediaUrl ? await createAssetFromUrl(req, {
    url: mediaUrl,
    team_id: fax.get('team_id'),
    user_id: null,
    source: 'fax'
  }) : null

  await fax.save({
    asset_id: asset ? asset.get('id') : null,
    num_pages,
    status,
    price,
    received_at: moment()
  }, {
    transacting: req.trx
  })

}

export const sendFax = async (req, params) => {

  const from = await findOrCreateNumber(req, {
    number: params.from
  })

  const to = await findOrCreateNumber(req, {
    number: params.to
  })

  const fax = await Fax.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    direction: 'outbound',
    status: 'pending',
    from_id: from.get('id'),
    to_id: to.get('id'),
    asset_id: params.asset_id
  }).save(null, {
    transacting: req.trx
  })

  await SendFaxQueue.enqueue(req, {
    id: fax.get('id')
  })

  return fax

}

export const queueFax = async (req, { id }) => {

  const fax = await Fax.query(qb => {
    qb.where('id', id)
  }).fetch({
    withRelated: ['asset','from','to'],
    transacting: req.trx
  })

  try {

    const result = await twilio.fax.faxes.create({
      from: fax.related('from').get('number'),
      to: fax.related('to').get('number'),
      mediaUrl: fax.related('asset').get('signed_url'),
      StatusCallbackMethod: 'POST',
      statusCallback: `${process.env.TWIML_HOST}/fax/feedback`
    })

    await fax.save({
      sid: result.sid,
      status: 'sending',
      sent_at: moment()
    }, {
      patch: true,
      transacting: req.trx
    })

  } catch(err) {

    await fax.save({
      status: 'failed'
    }, {
      patch: true,
      transacting: req.trx
    })

    throw(err)

  }

}

export const updateFax = async (req, { price, sid, status }) => {

  const sms = await Fax.query(qb => {
    qb.where('sid', sid)
  }).fetch({
    transacting: req.trx
  })

  await sms.save({
    price,
    status
  }, {
    patch: true,
    transacting: req.trx
  })

}
