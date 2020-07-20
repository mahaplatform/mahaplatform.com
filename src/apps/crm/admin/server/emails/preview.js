import renderEmail from '../../../services/email/render_email'
import EmailCampaign from '../../../models/email_campaign'
import Template from '../../../models/template'
import Email from '../../../models/email'

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

  res.status(200).type('text/html').send(html)

}

export default previewRoute
