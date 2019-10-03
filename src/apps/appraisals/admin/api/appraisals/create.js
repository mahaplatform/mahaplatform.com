import { activity } from '../../../../../web/core/services/routes/activities'
import AppraisalSerializer from '../../../serializers/appraisal_serializer'
import { whitelist } from '../../../../../web/core/services/routes/params'
import { audit } from '../../../../../web/core/services/routes/audit'
import socket from '../../../../../web/core/services/routes/emitter'
import Appraisal from '../../../models/appraisal'

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
