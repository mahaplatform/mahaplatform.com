const checkSerializer = (req, result) => ({
  id: result.get('id'),
  date_needed: result.get('date_needed'),
  delivery_method: result.get('delivery_method'),
  description: result.get('description'),
  account_number: result.get('account_number'),
  invoice_number: result.get('invoice_number'),
  receipt_id: result.get('asset_id'),
  receipts: result.related('receipts').map(receipt),
  expense_type: expense_type(result.related('expense_type')),
  project: project(result.related('project')),
  approver_ids: result.get('approver_ids'),
  vendor: vendor(result.related('vendor')),
  user: user(result.related('user')),
  amount: result.get('amount'),
  status: result.related('status').get('text'),
  total: result.get('total'),
  tax_total: result.get('tax_total'),
  project: project(result.related('project')),
  expense_type: expense_type(result.related('expense_type')),
  description: result.get('description'),
  amount: result.get('amount'),
  tax: result.get('tax'),
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
    source: receipt.related('asset').related('source').get('text'),
    source_url: receipt.related('asset').get('source_url')
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
    photo: user.related('photo') ? user.related('photo').get('path') : null
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

export default checkSerializer
