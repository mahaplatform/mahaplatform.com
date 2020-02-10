import SendConfirmationEmailQueue from '../../../../queues/send_confirmation_email_queue'
import Response from '../../../../models/response'

const confirmationRoute = async (req, res) => {

  const response = await Response.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('form_id', req.params.form_id)
    qb.where('id', req.params.response_id)
  }).fetch({
    transacting: req.trx
  })

  if(!response) return res.status(404).respond({
    code: 404,
    message: 'Unable to load response'
  })

  await SendConfirmationEmailQueue.enqueue(req, {
    id: response.get('id')
  })

  res.status(200).respond(true)

}

export default confirmationRoute
