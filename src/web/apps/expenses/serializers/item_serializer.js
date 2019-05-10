const expenseSerializer = (req, trx, result) => ({

  id: result.get('id'),

  item_id: result.get('item_id'),

  type: result.get('type'),

  date: result.get('date'),

  description: result.get('description'),

  expense_type: expense_type(result.related('expense_type')),

  project: project(result.related('project')),

  vendor: vendor(result.related('vendor')),

  user: user(result, 'user'),

  amount: result.get('amount'),

  status: result.related('status').get('text'),

  account: account(result.related('account')),

  idglacct: result.get('idglacct'),

  // integration: integration(result, req.apps.expenses.settings),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

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

const vendor = (vendor) => {

  if(!vendor.get('id')) return null

  return {

    id: vendor.get('id'),

    name: vendor.get('name'),

    integration: vendor.get('integration')

  }

}

const account = (account) => {

  if(!account.get('id')) return null

  return {

    id: account.get('id'),

    name: account.get('name')

  }

}
//
// const integration = (result, settings) => {
//
//   if(settings && settings.integration === 'accpac') {
//
//     return {
//       idglacct: result.get('idglacct')
//     }
//
//   }
//
//   return {}
//
// }

export default expenseSerializer
