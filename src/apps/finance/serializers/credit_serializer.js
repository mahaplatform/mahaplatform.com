const CreditSerializer = (req, result) => ({
  id: result.get('id'),
  amount: result.get('amount'),
  applied: result.get('applied'),
  balance: result.get('balance'),
  description: result.get('description'),
  customer: customer(result.related('customer')),
  program: program(result.related('program')),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const program = (program) => {
  if(!program.id) return null
  return {
    id: program.get('id'),
    title: program.get('title'),
    logo: program.related('logo') ? program.related('logo').get('path') : null
  }
}

const customer = (customer) => {
  if(!customer.id) return null
  return {
    id: customer.get('id'),
    display_name: customer.get('display_name')
  }
}

export default CreditSerializer
