const LineItemSerializer = (req, result) => ({
  id: result.get('id'),
  invoice: invoice(result.related('invoice')),
  description: result.get('description'),
  quantity: result.get('quantity'),
  price: result.get('price'),
  total: result.get('total'),
  is_tax_deductible: result.get('is_tax_deductible'),
  revenue_type: revenue_type(result.related('revenue_type')),
  project: project(result.related('project')),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const invoice = (invoice) => {
  if(!invoice.id) return null
  return {
    id: invoice.get('id'),
    date: invoice.get('date'),
    customer: customer(invoice.related('customer')),
    program: program(invoice.related('program'))
  }
}

const customer = (customer) => {
  if(!customer.id) return null
  return {
    id: customer.get('id'),
    display_name: customer.get('display_name'),
    address: customer.get('address'),
    email: customer.get('email')
  }
}

const revenue_type = (revenue_type) => {
  if(!revenue_type.get('id')) return null
  return {
    id: revenue_type.get('id'),
    title: revenue_type.get('title'),
    description: revenue_type.get('description'),
    full_title: revenue_type.get('full_title'),
    integration: revenue_type.get('integration')
  }
}

const program = (program) => {
  if(!program.id) return null
  return {
    id: program.get('id'),
    title: program.get('title')
  }
}

const project = (project) => {
  if(!project.get('id')) return null
  return {
    id: project.get('id'),
    title: project.get('title'),
    full_title: project.get('full_title'),
    integration: project.get('integration')
  }
}

export default LineItemSerializer
