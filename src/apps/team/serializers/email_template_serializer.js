import { serializer } from 'maha'

const emailTemplateSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  name: result.get('name'),

  code: result.get('code'),

  subject: result.get('subject'),

  layout: req.team.get('email_template'),

  html: result.get('html'),

  text: result.get('text'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

export default emailTemplateSerializer
