import ForwardEmailQueue from '../../../queues/forward_email_queue'
import Email from '../../..//models/email'
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

  await ForwardEmailQueue.enqueue(req, {
    email_id: email.get('id'),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    message: req.body.message
  })

  res.status(200).respond(true)

}

export default submitRoute
