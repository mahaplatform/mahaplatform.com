import SendFaxQueue from '../queues/send_fax_queue'
import twilio from '../../../core/services/twilio'
import { findOrCreateNumber } from './numbers'
import Fax from '../models/fax'
import moment from 'moment'

export const createCall = async (req, params) => {

  const from = await findOrCreateNumber(req, {
    number: params.from
  })

  const to = await findOrCreateNumber(req, {
    number: params.to
  })

  const fax = await Fax.forge({
    team_id: req.team.get('id'),
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

export const sendFax = async (req, { id }) => {

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
      mediaUrl: fax.related('asset').get('signed_url')
    })

    await fax.save({
      sid: result.sid,
      status: 'queued',
      sent_at: moment()
    }, {
      transacting: req.trx
    })

  } catch(err) {

    await fax.save({
      status: 'failed'
    }, {
      transacting: req.trx
    })

    throw(err)

  }

}
