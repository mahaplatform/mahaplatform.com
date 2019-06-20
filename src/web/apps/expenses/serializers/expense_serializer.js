const expenseSerializer = (req, result) => ({
  id: result.get('id'),
  date: result.get('date'),
  description: result.get('description'),
  receipt_id: result.get('asset_id'),
  receipts: result.related('receipts').map(receipt),
  expense_type: expense_type(result.related('expense_type')),
  project: project(result.related('project')),
  approver_ids: result.get('approver_ids'),
  vendor: vendor(result.related('vendor')),
  user: user(result, 'user'),
  amount: result.get('amount'),
  status: result.related('status').get('text'),
  account: account(result.related('account')),
  integration: integration(result, req.apps.expenses.settings),
  audit: result.related('audit').map(entry => audit(entry)),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

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

const receipt = (receipt) => {

  if(!receipt.get('id')) return null

  return {
    id: receipt.get('id'),
    asset_id: receipt.related('asset').get('id'),
    original_file_name: receipt.related('asset').get('original_file_name'),
    file_name: receipt.related('asset').get('file_name'),
    file_size: receipt.related('asset').get('file_size'),
    content_type: receipt.related('asset').get('content_type'),
    has_preview: receipt.related('asset').get('has_preview'),
    is_image: receipt.related('asset').get('is_image'),
    status: receipt.related('asset').get('status'),
    icon: receipt.related('asset').get('icon'),
    path: receipt.related('asset').get('path'),
    signed_url: receipt.related('asset').get('signed_url'),
    source: receipt.related('asset').related('source').get('text'),
    source_url: receipt.related('asset').get('source_url')
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
    full_address: vendor.get('full_address'),
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

const integration = (result, settings) => {

  if(settings && settings.integration === 'accpac') {

    return {
      idglacct: result.get('idglacct')
    }

  }

  return {}

}

export default expenseSerializer
