import twilio from '../../../core/services/twilio'
import Fax from '../models/fax'
import moment from 'moment'

export const sendFax = async (req, { id }) => {

  const fax = await Fax.query(qb => {
    qb.where('id', id)
  }).fetch({
    withRelated: ['asset','number'],
    transacting: req.trx
  })

  try {

    const result = await twilio.fax.faxes.create({
      from: fax.related('number').get('number'),
      to: fax.get('to'),
      mediaUrl: fax.related('asset').get('signed_url')
    })

    await result.save({
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

  }

}
