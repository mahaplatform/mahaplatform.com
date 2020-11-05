import EmailCampaign from '@apps/campaigns/models/email_campaign'
import renderEmail from '../../../services/email/render_email'
import Template from '@apps/crm/models/template'
import Email from '../../../models/email'
import inline from 'inline-css'

const getObject = async (req, { email_id, email_campaign_id, template_id }) => {
  if(email_id) {
    return await Email.query(qb => {
      qb.where('id', email_id)
    }).fetch({
      transacting: req.trx
    })
  }
  if(email_campaign_id) {
    return await EmailCampaign.query(qb => {
      qb.where('id', email_campaign_id)
    }).fetch({
      transacting: req.trx
    })
  }
  if(template_id) {
    return await Template.query(qb => {
      qb.where('id', template_id)
    }).fetch({
      transacting: req.trx
    })
  }
}
const previewRoute = async (req, res) => {

  const { email_campaign_id, email_id, template_id } = req.params

  const object = await getObject(req, {
    email_campaign_id,
    email_id,
    template_id
  })

  const html = await renderEmail(req, {
    config: object.get('config'),
    data: {
      host: process.env.WEB_HOST
    }
  })

  const inlined = await inline(html, {
    url: process.env.WEB_HOST,
    preserveMediaQueries: true
  })

  res.status(200).type('text/html').send(inlined)

}

export default previewRoute
