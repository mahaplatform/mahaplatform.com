import AppraisalSerializer from '../../../serializers/appraisal_serializer'
import Appraisal from '../../../models/appraisal'

const listRoute = async (req, res) => {

  const appraisals = await Appraisal.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('employee_id', req.user.get('id'))
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

export default listRoute
