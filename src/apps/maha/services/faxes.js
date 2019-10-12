import twilio from '../../../core/services/twilio'
import Fax from '../models/fax'
import moment from 'moment'

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
