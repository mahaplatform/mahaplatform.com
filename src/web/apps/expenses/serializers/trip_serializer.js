import serializer from '../../../core/objects/serializer'

const tripSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  expense_type: expense_type(result.related('expense_type')),

  project: project(result.related('project')),

  approver_ids: result.get('approver_ids'),

  user: user(result, 'user'),

  date: result.get('date'),

  description: result.get('description'),

  time_leaving: result.get('time_leaving'),

  time_arriving: result.get('time_arriving'),

  odometer_start: result.get('odometer_start'),

  odometer_end: result.get('odometer_end'),

  total_miles: result.get('total_miles'),

  mileage_rate: result.get('mileage_rate'),

  amount: result.get('amount'),

  status: result.related('status').get('text'),

  integration: integration(result, req.apps.expenses.settings),

  audit: result.related('audit').map(entry => audit(entry)),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

const audit = (entry) => ({

  id: entry.get('id'),

  user: user(entry, 'user'),

  story: entry.related('story').get('text'),

  created_at: entry.get('created_at'),

  updated_at: entry.get('updated_at')

})

const user = (result, key) => {

  if(!result.related(key)) return null

  return {

    id: result.related(key).get('id'),

    full_name: result.related(key).get('full_name'),

    initials: result.related(key).get('initials'),

    photo: result.related(key).related('photo') ? result.related(key).related('photo').get('path') : null

  }

}

const expense_type = (expense_type) => {

  if(!expense_type.get('id')) return null

  return {

    id: expense_type.get('id'),

    title: expense_type.get('title'),

    description: expense_type.get('description'),

    integration: expense_type.get('integration')

  }

}

const project = (project) => {

  if(!project.get('id')) return null

  return {

    id: project.get('id'),

    title: project.get('title'),

    integration: project.get('integration')

  }

}

const integration = (result, settings) => {

  if(settings && settings.integration === 'accpac') {

    return {
      idglacct: result.get('idglacct')
    }

  }

  return {}

}

export default tripSerializer
