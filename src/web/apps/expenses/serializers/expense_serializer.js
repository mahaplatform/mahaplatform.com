const expenseSerializer = (req, result) => ({
  id: result.get('id'),
  date: result.get('date'),
  receipt_id: result.get('asset_id'),
  receipts: result.related('receipts').map(receipt),
  approver_ids: result.get('approver_ids'),
  vendor: vendor(result.related('vendor')),
  user: user(result.related('user')),
  status: result.related('status').get('text'),
  account: account(result.related('account')),
  total: result.get('total'),
  tax_total: result.get('tax_total'),
  line_items: result.related('line_items').map(line_items),
  audit: result.related('audit').map(audit),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const line_items = (line_item) => ({
  id: line_item.get('id'),
  expense_type: expense_type(line_item.related('expense_type')),
  project: project(line_item.related('project')),
  description: line_item.get('description'),
  amount: line_item.get('amount'),
  tax: line_item.get('tax')
})

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
    photo: user.related('photo') ? user.related('photo').get('path') : null
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

export default expenseSerializer
