import twilio from '../../../core/services/twilio'
import Queue from '../../../core/objects/queue'
import Text from '../models/text'
import moment from 'moment'

const processor = async (job, trx) => {

  const text = await Text.query(qb => {
    qb.where('id', job.data.id)
  }).fetch({
    withRelated: ['contact','number','phone_number'],
    transacting: trx
  })

  const message = await twilio.messages.create({
    from: text.related('number').get('international'),
    to: text.related('phone_number').get('international'),
    body: text.get('body')
  })

  await text.save({
    sid: message.sid,
    status: 'sent',
    sent_at: moment()
  }, {
    transacting: trx
  })

}

const failed = async (job, err, trx) => {

  const text = await Text.query(qb => {
    qb.where('id', job.data.id)
  }).fetch({
    transacting: trx
  })

  await text.save({
    status: 'failed'
  }, {
    transacting: trx
  })

}

const SendTextQueue = new Queue({
  name: 'send_text',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default SendTextQueue
