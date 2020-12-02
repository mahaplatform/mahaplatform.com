import { expandData } from '@apps/forms/services/responses'

const ResponseSerializer = async (req, result) => ({
  id: result.get('id'),
  contact: contact(result.related('contact')),
  data: await data(req, result.related('form'), result.get('data')),
  enrollment: enrollment(result.related('enrollment')),
  referer: result.get('referer'),
  ipaddress: result.get('ipaddress'),
  duration: result.get('duration'),
  is_known: result.get('is_known'),
  revenue: result.get('revenue'),
  invoice_id: result.get('invoice_id'),
  payment: payment(result.related('payment')),
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

const payment = (payment) => {
  if(!payment) return null
  return {
    id: payment.get('id'),
    method: payment.get('method'),
    reference: payment.get('reference'),
    amount: payment.get('amount')
  }
}

const enrollment = (enrollment) => {
  if(!enrollment) return null
  return {
    id: enrollment.get('id'),
    workflow_id: enrollment.get('workflow_id')
  }
}

const data = async (req, form, data) => {
  if(!data) return {}
  if(!form.id) return data
  return await expandData(req, {
    fields: form.get('config').fields,
    data
  })
}

export default ResponseSerializer
