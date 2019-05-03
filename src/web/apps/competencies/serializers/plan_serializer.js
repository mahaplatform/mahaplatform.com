import serializer from '../../../core/objects/serializer'

const planSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  supervisor_id: result.get('supervisor_id'),

  supervisor: user(result, 'supervisor'),

  employee_id: result.get('employee_id'),

  employee: user(result, 'employee'),

  due: result.get('due'),

  is_completed: result.get('is_completed'),

  goal_count: result.related('goals').length,

  commitment_count: result.related('commitments').length,

  status: result.get('status'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

const user = (result, key) => {

  if(!result.related(key)) return null

  return {

    id: result.related(key).get('id'),

    full_name: result.related(key).get('full_name'),

    initials: result.related(key).get('initials'),

    photo: result.related(key).related('photo').get('path')

  }

}

export default planSerializer
