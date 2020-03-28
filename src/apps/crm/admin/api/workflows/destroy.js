import { activity } from '../../../../../core/services/routes/activities'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Workflow from '../../../models/workflow'
import moment from 'moment'

const destroyRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['emails'],
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  await workflow.save({
    deleted_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await Promise.mapSeries(workflow.related('emails'), async (email) => {
    await email.save({
      deleted_at: moment()
    }, {
      patch: true,
      transacting: req.trx
    })
  })

  await audit(req, {
    story: 'deleted',
    auditable: workflow
  })

  await activity(req, {
    story: 'deleted {object}',
    object: workflow
  })

  await socket.refresh(req, [
    '/admin/crm/workflows',
    `/admin/crm/workflows/${workflow.id}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
