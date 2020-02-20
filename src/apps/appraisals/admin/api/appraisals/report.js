import AppraisalSerializer from '../../../serializers/appraisal_serializer'
import Appraisal from '../../../models/appraisal'

const reportRoute = async (req, res) => {

  const appraisals = await Appraisal.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['supervisor_id','employee_id']
    },
    page: req.query.$page,
    withRelated: ['supervisor','employee'],
    transacting: req.trx
  })

  res.status(200).respond(appraisals, AppraisalSerializer)

}

export default reportRoute
