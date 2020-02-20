import AppraisalSerializer from '../../../serializers/appraisal_serializer'
import Appraisal from '../../../models/appraisal'

const employeesRoute = async (req, res) => {

  const appraisals = await Appraisal.filterFetch({
    scope: qb => {
      qb.joinRaw('inner join maha_supervisions on maha_supervisions.employee_id=appraisals_appraisals.employee_id and maha_supervisions.supervisor_id=?', req.user.get('id'))
      qb.where('maha_users.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['employee_id']
    },
    page: req.query.$page,
    withRelated: ['supervisor','employee'],
    transacting: req.trx
  })

  res.status(200).respond(appraisals, AppraisalSerializer)

}

export default employeesRoute
