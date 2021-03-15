import renderEmail from '@apps/automation/services/email/render_email'
import EmailCampaign from '@apps/campaigns/models/email_campaign'
import Announcement from '@apps/maha/models/announcement'
import Email from '@apps/automation/models/email'
import Template from '@apps/crm/models/template'
import inline from 'inline-css'

const getModel = (type) => {
  if(type === 'announcement') return Announcement
  if(type === 'email') return Email
  if(type === 'campaign') return EmailCampaign
  if(type === 'template') return Template
}

const previewRoute = async (req, res) => {

  const { type, code } = req.params

  const model = getModel(type)

  const object =  await model.query(qb => {
    qb.where('code', code)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = object.related('team')

  const html = await renderEmail(req, {
    config: object.get('config'),
    data: {
      host: process.env.ADMIN_HOST
    }
  })

  const inlined = await inline(html, {
    url: process.env.ADMIN_HOST,
    preserveMediaQueries: true
  })

  res.status(200).type('text/html').send(inlined)

}

export default previewRoute
