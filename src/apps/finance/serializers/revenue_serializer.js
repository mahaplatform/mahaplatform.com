const RevenueSerializer = (req, result) => ({
  id: result.get('id'),
  customer: customer(result.related('customer')),
  description: result.get('description'),
  payment_id: result.get('payment_id'),
  program: program(result.related('program')),
  project: project(result.related('project')),
  revenue_type: revenue_type(result.related('revenue_type')),
  amount: result.get('amount'),
  date: result.get('date'),
  created_at: result.get('created_at')
})

const customer = (customer) => {
  if(!customer.id) return null
  return {
    id: customer.get('id'),
    display_name: customer.get('display_name'),
    address: customer.get('address'),
    email: customer.get('email')
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

const program = (program) => {
  if(!program.id) return null
  return {
    id: program.get('id'),
    title: program.get('title')
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

export default RevenueSerializer
