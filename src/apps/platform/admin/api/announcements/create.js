import AnnouncementSerializer from '@apps/maha/serializers/announcement_serializer'
import GenerateScreenshotQueue from '@apps/maha/queues/generate_screenshot_queue'
import { activity } from '@core/services/routes/activities'
import Announcement from '@apps/maha/models/announcement'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'maha_announcements'
  })

  const announcement = await Announcement.forge({
    code,
    status: 'draft',
    title: req.body.title,
    to: req.body.to,
    config: {
      page: {
        background_color: '#DFDFDF'
      },
      header: {
        blocks: [{
          type: 'web',
          text: `
            <p>
              Not displaying correctly?
              <a href="<%- email.web_link %>">View in browser</a>
            </p>
          `,
          padding: 8,
          p_font_size: 12,
          p_text_align: 'center',
          p_line_height: 1.5
        }]
      },
      body: {
        background_color: '#FFFFFF',
        blocks: [{
          type: 'text',
          content_0: `
            <p><%- contact.first_name %>,</p>
            <p></p>
            <p>Messenger bag portland adaptogen food truck pabst, la croix pug
            vinyl mumblecore chartreuse. Art party schlitz portland, try-hard
            semiotics tumblr green juice gentrify letterpress tilde gochujang
            whatever helvetica tote bag. Locavore quinoa man braid cred selvage
            chambray. Post-ironic everyday carry kale chips umami woke polaroid,
            meggings organic pork belly air plant.</p>
          `,
          padding: 16
        }]
      },
      footer: {
        blocks: []
      },
      settings: {
        from: `${req.user.get('full_name')} <${req.user.get('full_name').replace(/[\s]/, '').toLowerCase()}-${req.team.get('email')}}>`,
        subject: req.body.subject,
        reply_to: req.user.get('rfc822')
      }
    }
  }).save(null, {
    transacting: req.trx
  })

  await GenerateScreenshotQueue.enqueue(req, {
    announcement_id: announcement.get('id')
  })

  await audit(req, {
    story: 'created',
    auditable: announcement
  })

  await activity(req, {
    story: 'created {object}',
    object: announcement
  })

  await socket.refresh(req, [
    '/admin/platform/announcements'
  ])

  await res.status(200).respond(announcement, AnnouncementSerializer)

}

export default createRoute
