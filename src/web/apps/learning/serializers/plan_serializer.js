const planSerializer = (req, result) => ({
  id: result.get('id'),
  supervisor_id: result.get('supervisor_id'),
  supervisor: user(result.related('supervisor')),
  employee_id: result.get('employee_id'),
  employee: user(result.related('employee')),
  due: result.get('due'),
  is_completed: result.get('is_completed'),
  goal_count: result.related('goals').length,
  commitment_count: result.related('commitments').length,
  status: result.get('status'),
  remind_me_4_weeks: result.get('remind_me_4_weeks'),
  remind_me_2_weeks: result.get('remind_me_2_weeks'),
  remind_me_1_week: result.get('remind_me_1_week'),
  audit: result.related('audit').map(entry => audit(entry)),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const user = (user) => {
  if(!user.id) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

const audit = (entry) => ({
  id: entry.get('id'),
  user: user(entry, 'user'),
  story: entry.related('story').get('text'),
  created_at: entry.get('created_at'),
  updated_at: entry.get('updated_at')
})

export default planSerializer
