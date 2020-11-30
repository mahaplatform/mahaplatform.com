import renderEmail from '@apps/automation/services/email/render_email'
import EmailCampaign from '@apps/campaigns/models/email_campaign'
import Announcement from '@apps/maha/models/announcement'
import { getScreenshot } from '@core/services/screenshot'
import socket from '@core/services/routes/emitter'
import Email from '@apps/automation/models/email'
import Template from '@apps/crm/models/template'
import { s3 } from '@core/services/aws'
import moment from 'moment'

const getObject = async (req, params) => {
  const { announcement_id, email_id, email_campaign_id, template_id } = params
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
  if(announcement_id) {
    return await Announcement.query(qb => {
      qb.where('id', announcement_id)
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

const generateScreenshot = async(req, params) => {

  const { announcement_id, email_id, email_campaign_id, template_id } = params

  const object = await getObject(req, params)

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
    screenshoted_at: moment().toDate()
  }, {
    patch: true,
    transacting: req.trx
  })

  await saveScreenshot(req, {
    data,
    key: object.get('preview')
  })

  await socket.refresh(req, [
    ...announcement_id ? [`/admin/platform/announcements/${object.get('id')}`] : [],
    ...email_id ? [`/admin/automation/emails/${object.get('id')}`] : [],
    ...email_campaign_id ? [`/admin/campaigns/email/${object.get('id')}`] : [],
    ...template_id ? [`/admin/crm/programs/${object.get('program_id')}/templates/${object.get('id')}`] : []
  ])

}

export default generateScreenshot
