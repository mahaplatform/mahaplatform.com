const orderSerializer = (req, result) => ({
  id: result.get('id'),
  contact: contact(result.related('contact')),
  enrollment: enrollment(result.related('enrollment')),
  contact_config: result.get('contact_config'),
  payment: payment(result.related('payment')),
  invoice_id: result.get('invoice_id'),
  ipaddress: result.get('ipaddress'),
  referer: result.get('referer'),
  duration: result.get('duration'),
  is_known: result.get('is_known'),
  tokens: result.get('tokens'),
  data: result.get('data'),
  items: result.related('items').map(item),
  items_count: result.get('items_count'),
  unfulfilled_count: result.get('unfulfilled_count'),
  revenue: result.get('revenue'),
  is_paid: result.get('is_paid'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const contact = (contact) => {
  if(!contact) return null
  return {
    id: contact.get('id'),
    display_name: contact.get('display_name'),
    initials: contact.get('initials'),
    email: contact.get('email'),
    photo: contact.related('photo') ? contact.related('photo').get('path') : null
  }
}

const enrollment = (enrollment) => {
  if(!enrollment) return null
  return {
    id: enrollment.get('id'),
    workflow_id: enrollment.get('workflow_id')
  }
}

const payment = (payment) => {
  if(!payment) return null
  return {
    id: payment.get('id'),
    method: payment.get('method'),
    reference: payment.get('reference'),
    amount: payment.get('amount')
  }
}

const item = (item) => {
  if(!item) return null
  return {
    id: item.get('id'),
    variant: variant(item.related('variant')),
    status: item.get('status'),
    created_at: item.get('created_at'),
    updated_at: item.get('updated_at')
  }
}

const variant = (variant) => {
  if(!variant) return null
  return {
    id: variant.get('id'),
    code: variant.get('code'),
    options: variant.get('options'),
    photos: variant.related('photos').map(photo),
    product: product(variant.related('product'))
  }
}

const product = (product) => {
  if(!product) return null
  return {
    id: product.get('id'),
    title: product.get('title')
  }
}

const photo = (photo) => {
  if(!photo) return null
  return {
    id: photo.get('id'),
    asset: asset(photo.related('asset'))
  }
}

const asset = (asset) => {
  if(!asset) return null
  return {
    id: asset.get('id'),
    path: asset.get('path'),
    signed_url: asset.get('signed_url')
  }
}

export default orderSerializer
