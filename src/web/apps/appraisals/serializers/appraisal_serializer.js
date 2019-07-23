const appraisalSerializer = (req, result) => ({
  id: result.get('id'),
  supervisor: user(result.related('supervisor')),
  employee: user(result.related('employee')),
  employee_position_description: result.get('employee_position_description'),
  accomplishments: result.get('accomplishments'),
  challenges: result.get('challenges'),
  job_goals: result.get('job_goals'),
  development_goals: result.get('development_goals'),
  additional_comments: result.get('additional_comments'),
  supervisor_position_description: result.get('supervisor_position_description'),
  responsibilities: result.related('responsibilities').map(responsibility),
  documentation_rating: result.get('documentation_rating'),
  documentation_comments: result.get('documentation_comments'),
  attendance_rating: result.get('attendance_rating'),
  attendance_comments: result.get('attendance_comments'),
  health_safety_rating: result.get('health_safety_rating'),
  health_safety_comments: result.get('health_safety_comments'),
  inclusiveness_rating: result.get('inclusiveness_rating'),
  inclusiveness_comments: result.get('inclusiveness_comments'),
  adaptability_rating: result.get('adaptability_rating'),
  adaptability_comments: result.get('adaptability_comments'),
  self_development_rating: result.get('self_development_rating'),
  self_development_comments: result.get('self_development_comments'),
  communication_rating: result.get('communication_rating'),
  communication_comments: result.get('communication_comments'),
  teamwork_rating: result.get('teamwork_rating'),
  teamwork_comments: result.get('teamwork_comments'),
  service_minded_rating: result.get('service_minded_rating'),
  service_minded_comments: result.get('service_minded_comments'),
  stewardship_rating: result.get('stewardship_rating'),
  stewardship_comments: result.get('stewardship_comments'),
  motivation_rating: result.get('motivation_rating'),
  motivation_comments: result.get('motivation_comments'),
  employee_communication_rating: result.get('employee_communication_rating'),
  employee_communication_comments: result.get('employee_communication_comments'),
  delegation_rating: result.get('delegation_rating'),
  delegation_comments: result.get('delegation_comments'),
  recruitment_retention_rating: result.get('recruitment_retention_rating'),
  recruitment_retention_comments: result.get('recruitment_retention_comments'),
  audit: result.related('audit').map(audit),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const responsibility = (responsibility) => {
  if(!responsibility.id) return null
  return {
    id: responsibility.get('id'),
    responsibility_type: responsibility.related('responsibility_type').get('text'),
    weight: responsibility.get('weight'),
    rating: responsibility.get('rating'),
    comments: responsibility.get('comments')
  }
}

const audit = (entry) => ({
  id: entry.get('id'),
  user: user(entry.related('user')),
  story: entry.related('story').get('text'),
  created_at: entry.get('created_at'),
  updated_at: entry.get('updated_at')
})

const user = (user) => {
  if(!user.id) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo').get('path')
  }
}

export default appraisalSerializer
