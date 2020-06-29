const AllocationSerializer = (req, result) => ({
  id: result.get('id'),
  payment: payment(result.related('payment')),
  line_item: line_item(result.related('line_item')),
  customer: customer(result.related('payment').related('invoice').related('customer')),
  program: program(result.related('payment').related('invoice').related('program')),
  project: project(result.related('line_item').related('project')),
  revenue_type: revenue_type(result.related('line_item').related('revenue_type')),
  amount: result.get('amount'),
  fee: result.get('fee'),
  total: result.get('total'),
  status: result.get('status'),
  created_at: result.get('created_at')
})

const payment = (payment) => {
  if(!payment.id) return null
  return {
    id: payment.get('id'),
    date: payment.get('date')
  }
}

const line_item = (line_item) => {
  if(!line_item.id) return null
  return {
    id: line_item.get('id'),
    description: line_item.get('description')
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


export default AllocationSerializer
