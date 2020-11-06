import AppraisalSerializer from '@apps/appraisals/serializers/appraisal_serializer'
import { activity } from '@core/services/routes/activities'
import Appraisal from '@apps/appraisals/models/appraisal'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'

const createRoute = async (req, res) => {

  const appraisal = await Appraisal.forge({
    team_id: req.team.get('id'),
    supervisor_id: req.user.get('id'),
    ...whitelist(req.body, ['employee_id'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: appraisal
  })

  await audit(req, {
    story: 'assigned',
    auditable: appraisal
  })

  await socket.refresh(req, [
    { channel: `/admin/users/${appraisal.get('employee_id')}`, target: '/admin/appraisals/appraisals' },
    { channel: `/admin/users/${appraisal.get('supervisor_id')}`, target: '/admin/appraisals/appraisals/employees' },
    '/admin/appraisals/appraisals/report'
  ])

  res.status(200).respond(appraisal, AppraisalSerializer)

}

export default createRoute
