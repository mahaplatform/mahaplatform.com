import { renderEmail } from '../../../services/email'
import Form from '../../../models/form'
import inline from 'inline-css'

const previewRoute = async (req, res) => {

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
  const email = form.related('email')

  const rendered = await renderEmail(req, {
    config: email.get('config')
  })

  const html = await inline(rendered, {
    url: 'https://mahaplatform.com',
    preserveMediaQueries: true
  })

  res.status(200).send(html)

}

export default previewRoute
