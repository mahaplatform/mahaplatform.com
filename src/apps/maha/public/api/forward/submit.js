import ForwardEmailQueue from '@apps/maha/queues/forward_email_queue'
import Email from '@apps/maha/models/email'
import { checkToken } from './utils'

const submitRoute = async (req, res) => {

  if(!checkToken(req.headers.authorization, req.params.code)) {
    return res.status(401).send('Unauthorized')
  }

  const email = await Email.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['email_campaign'],
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  await ForwardEmailQueue.enqueue(req, {
    email_id: email.get('id'),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    message: req.body.message
  })

  await res.status(200).respond(true)

}

export default submitRoute
