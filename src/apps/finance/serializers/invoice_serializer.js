const InvoiceSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  customer: customer(result.related('customer')),
  coupon: coupon(result.related('coupon')),
  balance: result.get('balance'),
  date: result.get('date'),
  discount: result.get('discount'),
  due: result.get('due'),
  is_paid: result.get('is_paid'),
  line_items: result.related('line_items').map(line_items),
  notes: result.get('notes'),
  payments: result.related('payments').map(payment),
  paid: result.get('paid'),
  program: program(result.related('program')),
  status: result.get('status'),
  subtotal: result.get('subtotal'),
  tax: result.get('tax'),
  total: result.get('total'),
  voided_at: result.get('voided_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const customer = (customer) => {
  if(!customer.id) return null
  return {
    id: customer.get('id'),
    display_name: customer.get('display_name'),
    email: customer.get('email')
  }
}

const coupon = (coupon) => {
  if(!coupon.id) return null
  return {
    id: coupon.get('id'),
    code: coupon.get('code'),
    percent: coupon.get('percent'),
    amount: coupon.get('amount')
  }
}

const line_items = (line_item) => {
  if(!line_item.id) return null
  return {
    id: line_item.get('id'),
    product: product(line_item.related('product')),
    quantity: line_item.get('quantity'),
    price: line_item.get('price'),
    total: line_item.get('total')
  }
}

const payment = (payment) => {
  if(!payment.id) return null
  return {
    id: payment.get('id'),
    date: payment.get('date'),
    method: payment.get('method'),
    description: payment.get('description'),
    amount: payment.get('amount'),
    voided_at: payment.get('voided_at')
  }
}

const product = (product) => {
  if(!product.id) return null
  return {
    id: product.get('id'),
    title: product.get('title')
  }
}

const program = (program) => {
  if(!program.id) return null
  return {
    id: program.get('id'),
    title: program.get('title'),
    logo: program.related('logo') ? program.related('logo').get('path') : null
  }
}

export default InvoiceSerializer
