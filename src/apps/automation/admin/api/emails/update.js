import GenerateScreenshotQueue from '../../../queues/generate_screenshot_queue'
import EmailSerializer from '../../../serializers/email_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Email from '../../../models/email'

const updateRoute = async (req, res) => {

  const email = await Email.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['form','program','workflow'],
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  await email.save({
    ...whitelist(req.body, ['title','config'])
  }, {
    transacting: req.trx
  })

  await GenerateScreenshotQueue.enqueue(req, {
    email_id: email.get('id')
  })

  await audit(req, {
    story: 'updated',
    auditable: email
  })

  await activity(req, {
    story: 'updated {object}',
    object: email
  })

  await socket.refresh(req, [
    '/admin/automation/emails',
    `/admin/automation/emails/${email.id}`
  ])

  res.status(200).respond(email, EmailSerializer)

}

export default updateRoute
