import renderEmail from '@apps/automation/services/email/render_email'
import EmailCampaign from '@apps/campaigns/models/email_campaign'
import Announcement from '@apps/maha/models/announcement'
import Email from '@apps/automation/models/email'
import Template from '@apps/crm/models/template'
import inline from 'inline-css'

const getObject = async (req, { type, id }) => {
  if(type === 'announcement') {
    return await Announcement.query(qb => {
      qb.where('id', id)
    }).fetch({
      transacting: req.trx
    })
  }
  if(type === 'email') {
    return await Email.query(qb => {
      qb.where('id', id)
    }).fetch({
      transacting: req.trx
    })
  }
  if(type === 'campaign') {
    return await EmailCampaign.query(qb => {
      qb.where('id', id)
    }).fetch({
      transacting: req.trx
    })
  }
  if(type === 'template') {
    return await Template.query(qb => {
      qb.where('id', id)
    }).fetch({
      transacting: req.trx
    })
  }
}
const previewRoute = async (req, res) => {

  const { type, id } = req.params

  const object = await getObject(req, {
    type,
    id
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
