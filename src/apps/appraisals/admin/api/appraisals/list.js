import AppraisalSerializer from '../../../serializers/appraisal_serializer'
import Appraisal from '../../../models/appraisal'

const listRoute = async (req, res) => {

  const appraisals = await Appraisal.scope({
    team: req.team
  }).query(qb => {
    qb.where('employee_id', req.user.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['employee_id']
  }).fetchPage({
    withRelated: ['supervisor','employee'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(appraisals, AppraisalSerializer)

}

export default listRoute
