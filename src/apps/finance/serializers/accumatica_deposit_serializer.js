import numeral from 'numeral'

const subaccount= (allocation) => {
  const line_item = allocation.related('line_item')
  const project = line_item.related('project').get('integration')
  const revenue_type = line_item.related('revenue_type').get('integration')
  const parts = []
  parts.push(project.program_code)
  parts.push(revenue_type.source_code)
  parts.push(project.match)
  parts.push(project.main_project_code)
  parts.push(project.project_code)
  parts.push('0000000')
  return parts.join('-')
}

const getPayment = (allocation) => {
  if(allocation.get('payment_id')) return allocation.related('payment')
  if(allocation.get('refund_id')) return allocation.related('refund').related('payment')
}

const getLineItemDescription = (allocation, text) => {
  const payment = getPayment(allocation)
  const parts = [payment.related('invoice').related('customer').get('display_name')]
  parts.push(allocation.related('line_item').get('description'))
  if(text) parts.push(text)
  return parts.join(' - ')
}

const getTransaction = (deposit, allocation, index) => [
  getLineItemDescription(allocation),
  numeral(allocation.related('line_item').get('quantity')).format('0.00'),
  numeral(allocation.related('line_item').get('price')).format('0.0000'),
  numeral(allocation.get('total')).format('0.00'),
  '0.000000',
  '0.00',
  numeral(allocation.get('total')).format('0.00'),
  allocation.related('line_item').related('revenue_type').get('integration').revenue_code,
  subaccount(allocation)
]

const getFee = (deposit, allocation) => [
  getLineItemDescription(allocation, 'Processing Fee'),
  '-1.00',
  numeral(allocation.get('fee')).format('0.0000'),
  numeral(0 - allocation.get('fee')).format('0.00'),
  '0.000000',
  '0.00',
  numeral(0 - allocation.get('fee')).format('0.00'),
  '61110',
  subaccount(allocation)
]

const accpaccDepositSerializer = async (req, { allocations, deposit }) => {
  return allocations.reduce((revenues, allocation, index) => [
    ...revenues,
    getTransaction(deposit, allocation, index),
    ...allocation.get('fee') > 0 ? [
      getFee(deposit, allocation)
    ] : []
  ], [[
    'Transaction Descr.',
    'Quantity',
    'Unit Price',
    'Ext. Price',
    'Discount Percent',
    'Discount Amount',
    'Amount',
    'Account',
    'Subaccount'
  ]])
}

export default accpaccDepositSerializer
