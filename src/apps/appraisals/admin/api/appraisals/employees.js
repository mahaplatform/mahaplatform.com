import AppraisalSerializer from '../../../serializers/appraisal_serializer'
import Appraisal from '../../../models/appraisal'

const employeesRoute = async (req, res) => {

  const appraisals = await Appraisal.filter({
    scope: qb => {
      qb.joinRaw('inner join maha_supervisions on maha_supervisions.employee_id=appraisals_appraisals.employee_id and maha_supervisions.supervisor_id=?', req.user.get('id'))
      qb.where('maha_users.team_id', req.team.get('id'))
    },
    filter: req.query.$filter,
    filterParams: ['employee_id']
  }).fetchPage({
    withRelated: ['supervisor','employee'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(appraisals, AppraisalSerializer)

}

export default employeesRoute
