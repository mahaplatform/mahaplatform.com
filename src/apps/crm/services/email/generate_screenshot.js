import { getScreenshot } from '../../../../core/services/screenshot'
import socket from '../../../../core/services/routes/emitter'
import EmailCampaign from '../../models/email_campaign'
import s3 from '../../../../core/services/s3'
import Template from '../../models/template'
import renderEmail from './render_email'
import Email from '../../models/email'

const getObject = async (req, { email_id, email_campaign_id, template_id }) => {
  if(email_id) {
    return await Email.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('id', email_id)
    }).fetch({
      transacting: req.trx
    })
  }
  if(email_campaign_id) {
    return await EmailCampaign.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('id', email_campaign_id)
    }).fetch({
      transacting: req.trx
    })
  }
  if(template_id) {
    return await Template.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('id', template_id)
    }).fetch({
      transacting: req.trx
    })
  }
}

const saveScreenshot = async (req, { data, key }) => {
  await s3.upload({
    ACL: 'private',
    Body: data,
    Bucket: process.env.AWS_BUCKET,
    ContentType: 'image/jpeg',
    Key: key
  }).promise()
}

const generateScreenshot = async(req, { email_campaign_id, email_id, template_id }) => {

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

  const data = await getScreenshot({
    html,
    config: {
      windowSize: {
        width: 580,
        height: 850
      },
      shotSize: {
        width: 580,
        height: 850
      },
      userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g',
      phantomConfig: {
        'ignore-ssl-errors': true
      }
    }
  })

  await object.save({
    has_preview: true
  }, {
    patch: true,
    transacting: req.trx
  })

  await saveScreenshot(req, {
    data,
    key: object.get('preview')
  })

  await socket.refresh(req, [
    ...email_id ? [`/admin/crm/emails/${email_id}`] : [],
    ...email_campaign_id ? [`/admin/crm/campagins/emails/${email_campaign_id}`] : []
  ])

}

export default generateScreenshot
