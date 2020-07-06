const InvoiceSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  customer: customer(result.related('customer')),
  balance: result.get('balance'),
  date: result.get('date'),
  discount: result.get('discount'),
  discount_amount: result.get('discount_amount'),
  discount_percent: result.get('discount_percent'),
  due: result.get('due'),
  line_items: result.related('invoice_line_items').map(line_items),
  notes: result.get('notes'),
  payments: result.related('payments').map(payment),
  paid: result.get('paid'),
  program: program(result.related('program')),
  status: result.get('status'),
  subtotal: result.get('subtotal'),
  tax: result.get('tax'),
  tax_deductible: result.get('tax_deductible'),
  total: result.get('total'),
  voided_date: result.get('voided_date'),
  voided_reason: result.get('voided_reason'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
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

const line_items = (line_item) => {
  if(!line_item.get('line_item_id')) return null
  return {
    id: line_item.get('line_item_id'),
    description: line_item.get('description'),
    quantity: line_item.get('quantity'),
    price: line_item.get('price'),
    total: line_item.get('total'),
    is_tax_deductible: line_item.get('is_tax_deductible')
  }
}

const payment = (payment) => {
  if(!payment.id) return null
  return {
    id: payment.get('id'),
    activity: payment.get('activity'),
    amount: payment.get('amount'),
    date: payment.get('date'),
    description: payment.get('description'),
    method: payment.get('method'),
    payment_method: payment_method(payment.related('payment_method')),
    voided_date: payment.get('voided_date')
  }
}

const payment_method = (payment_method) => {
  if(!payment_method.id) return null
  return {
    id: payment_method.get('id'),
    account_type: payment_method.get('card_type'),
    card_type: payment_method.get('card_type'),
    expiration_month: payment_method.get('expiration_month'),
    expiration_year: payment_method.get('expiration_year'),
    ownership_type: payment_method.get('card_type'),
    last_four: payment_method.get('last_four'),
    method: payment_method.get('method')
  }
}

const program = (program) => {
  if(!program.id) return null
  return {
    id: program.get('id'),
    title: program.get('title'),
    logo: program.related('logo') ? program.related('logo').get('path') : null,
    address: program.get('address')
  }
}

export default InvoiceSerializer
