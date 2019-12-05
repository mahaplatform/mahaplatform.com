const PaymentSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  amount: result.get('amount'),
  braintree_id: result.get('braintree_id'),
  braintree_link: result.get('braintree_link'),
  card_type: result.get('card_type'),
  credit: credit(result.related('credit')),
  date: result.get('date'),
  description: result.get('description'),
  disbursement: disbursement(result.related('disbursement')),
  fee: result.get('fee'),
  invoice: invoice(result.related('invoice')),
  merchant: merchant(result.related('merchant')),
  method: result.get('method'),
  photo: photo(result.related('photo')),
  rate: result.get('rate'),
  reference: result.get('reference'),
  refunded: result.get('refunded'),
  refundable: result.get('refundable'),
  scholarship: scholarship(result.related('scholarship')),
  status: result.get('status'),
  voided_date: result.get('voided_date'),
  voided_reason: result.get('voided_reason'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const invoice = (invoice) => {
  if(!invoice.id) return null
  return {
    id: invoice.get('id'),
    code: invoice.get('code'),
    customer: customer(invoice.related('customer'))
  }
}

const customer = (customer) => {
  if(!customer.id) return null
  return {
    id: customer.get('id'),
    display_name: customer.get('display_name')
  }
}

const disbursement = (disbursement) => {
  if(!disbursement.id) return null
  return {
    id: disbursement.get('id'),
    date: disbursement.get('date'),
    merchant: merchant(disbursement.related('merchant'))
  }
}

const merchant = (merchant) => {
  if(!merchant.id) return null
  return {
    id: merchant.get('id'),
    title: merchant.get('title'),
    braintree_id: merchant.get('braintree_id')
  }
}

const credit = (credit) => {
  if(!credit.id) return null
  return {
    id: credit.get('id')
  }
}

const scholarship = (scholarship) => {
  if(!scholarship.id) return null
  return {
    id: scholarship.get('id')
  }
}

const photo = (photo) => {
  if(!photo.get('id')) return null
  return {
    id: photo.get('id'),
    original_file_name: photo.get('original_file_name'),
    file_name: photo.get('file_name'),
    file_size: photo.get('file_size'),
    content_type: photo.get('content_type'),
    has_preview: photo.get('has_preview'),
    is_image: photo.get('is_image'),
    status: photo.get('status'),
    icon: photo.get('icon'),
    path: photo.get('path'),
    signed_url: photo.get('signed_url'),
    source: photo.related('source').get('text'),
    source_url: photo.get('source_url')
  }
}

export default PaymentSerializer
