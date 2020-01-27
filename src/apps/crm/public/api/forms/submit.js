import { sendMail } from '../../../../../core/services/email'
import { renderEmail } from '../../../services/email'
import Response from '../../../models/response'
import Form from '../../../models/form'

const submitRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['email.sender'],
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  const response = await Response.forge({
    team_id: form.get('team_id'),
    form_id: form.get('id'),
    ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    data: req.body
  }).save(null, {
    transacting: req.trx
  })

  const email = form.related('email')

  const html = renderEmail(req, {
    config: email.get('config'),
    data: response.get('data')
  })

  await sendMail({
    from: email.related('sender').get('rfc822'),
    to: 'mochini@gmail.com',
    subject: email.get('subject'),
    html
  })

  res.status(200).respond(true)

}

export default submitRoute
