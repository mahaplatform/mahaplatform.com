import { activity } from '../../../../../core/services/routes/activities'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Form from '../../../models/form'
import moment from 'moment'

const destroyRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['emails','workflows'],
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  await form.save({
    deleted_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await Promise.mapSeries(form.related('emails'), async (email) => {
    await email.save({
      deleted_at: moment()
    }, {
      patch: true,
      transacting: req.trx
    })
  })

  await Promise.mapSeries(form.related('workflows'), async (workflow) => {
    await workflow.save({
      deleted_at: moment()
    }, {
      patch: true,
      transacting: req.trx
    })
  })

  await audit(req, {
    story: 'deleted',
    auditable: form
  })

  await activity(req, {
    story: 'deleted {object}',
    object: form
  })

  await socket.refresh(req, [
    '/admin/crm/forms',
    `/admin/crm/forms/${form.id}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
