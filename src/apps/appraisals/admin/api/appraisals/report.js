import AppraisalSerializer from '../../../serializers/appraisal_serializer'
import Appraisal from '../../../models/appraisal'

const reportRoute = async (req, res) => {

  const appraisals = await Appraisal.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['supervisor_id','employee_id']
  }).fetchPage({
    withRelated: ['supervisor','employee'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(appraisals, AppraisalSerializer)

}

export default reportRoute
