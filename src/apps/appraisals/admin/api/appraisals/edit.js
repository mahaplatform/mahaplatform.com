import Appraisal from '../../../models/appraisal'

const editRoute = async (req, res) => {

  const appraisal = await Appraisal.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['responsibilities'],
    transacting: req.trx
  })

  if(!appraisal) return res.status(404).respond({
    code: 404,
    message: 'Unable to load appraisal'
  })

  res.status(200).respond(appraisal, (req, appraisal) => ({
    employee_position_description_updated: appraisal.get('employee_position_description_updated'),
    employee_position_description_comments: appraisal.get('employee_position_description_comments'),
    accomplishments: appraisal.get('accomplishments'),
    challenges: appraisal.get('challenges'),
    job_goals: appraisal.get('job_goals'),
    development_goals: appraisal.get('development_goals'),
    additional_comments: appraisal.get('additional_comments'),
    supervisor_position_description_updated: appraisal.get('supervisor_position_description_updated'),
    supervisor_position_description_comments: appraisal.get('supervisor_position_description_comments'),
    responsibilities: appraisal.related('responsibilities').map(responsibility => ({
      id: responsibility.get('id'),
      responsibility_type_id: responsibility.get('responsibility_type_id'),
      weight: responsibility.get('weight'),
      rating: responsibility.get('rating'),
      comments: responsibility.get('comments')
    })),
    documentation_rating: appraisal.get('documentation_rating'),
    documentation_comments: appraisal.get('documentation_comments'),
    attendance_rating: appraisal.get('attendance_rating'),
    attendance_comments: appraisal.get('attendance_comments'),
    health_safety_rating: appraisal.get('health_safety_rating'),
    health_safety_comments: appraisal.get('health_safety_comments'),
    inclusiveness_rating: appraisal.get('inclusiveness_rating'),
    inclusiveness_comments: appraisal.get('inclusiveness_comments'),
    adaptability_rating: appraisal.get('adaptability_rating'),
    adaptability_comments: appraisal.get('adaptability_comments'),
    self_development_rating: appraisal.get('self_development_rating'),
    self_development_comments: appraisal.get('self_development_comments'),
    communication_rating: appraisal.get('communication_rating'),
    communication_comments: appraisal.get('communication_comments'),
    teamwork_rating: appraisal.get('teamwork_rating'),
    teamwork_comments: appraisal.get('teamwork_comments'),
    service_minded_rating: appraisal.get('service_minded_rating'),
    service_minded_comments: appraisal.get('service_minded_comments'),
    stewardship_rating: appraisal.get('stewardship_rating'),
    stewardship_comments: appraisal.get('stewardship_comments'),
    motivation_rating: appraisal.get('motivation_rating'),
    motivation_comments: appraisal.get('motivation_comments'),
    employee_communication_rating: appraisal.get('employee_communication_rating'),
    employee_communication_comments: appraisal.get('employee_communication_comments'),
    delegation_rating: appraisal.get('delegation_rating'),
    delegation_comments: appraisal.get('delegation_comments'),
    recruitment_retention_rating: appraisal.get('recruitment_retention_rating'),
    recruitment_retention_comments: appraisal.get('recruitment_retention_comments')
  }))

}

export default editRoute
