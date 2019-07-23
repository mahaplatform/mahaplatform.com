import Appraisal from '../../../models/appraisal'

const editRoute = async (req, res) => {

  const appraisal = await Appraisal.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['supervisor','employee'],
    transacting: req.trx
  })

  if(!appraisal) return res.status(404).respond({
    code: 404,
    message: 'Unable to load appraisal'
  })

  res.status(200).respond(appraisal, {
    fields: [
      'id',
      'employee_position_description',
      'accomplishments',
      'challenges',
      'job_goals',
      'development_goals',
      'additional_comments',
      'supervisor_position_description',
      'documentation_rating',
      'documentation_comments',
      'attendance_rating',
      'attendance_comments',
      'health_safety_rating',
      'health_safety_comments',
      'inclusiveness_rating',
      'inclusiveness_comments',
      'adaptability_rating',
      'adaptability_comments',
      'self_development_rating',
      'self_development_comments',
      'communication_rating',
      'communication_comments',
      'teamwork_rating',
      'teamwork_comments',
      'service_minded_rating',
      'service_minded_comments',
      'stewardship_rating',
      'stewardship_comments',
      'motivation_rating',
      'motivation_comments',
      'employee_communication_rating',
      'employee_communication_comments',
      'delegation_rating',
      'delegation_comments',
      'recruitment_retention_rating',
      'recruitment_retention_comments'
    ]
  })

}

export default editRoute
