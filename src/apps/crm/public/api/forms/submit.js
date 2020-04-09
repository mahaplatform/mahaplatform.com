import { createOrUpdateContact, handlePayment } from '../../../services/forms'
import socket from '../../../../../core/services/routes/emitter'
import { enrollInWorkflows } from '../../../services/workflows'
import { contactActivity } from '../../../services/activities'
import Response from '../../../models/response'
import Form from '../../../models/form'
import { checkToken } from '../utils'
import moment from 'moment'
import _ from 'lodash'

const submitRoute = async (req, res) => {

  if(!checkToken(req.headers.authorization, req.params.code)) {
    return res.status(401).send('Unauthorized')
  }

  const form = await Form.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['program','team','workflows'],
    transacting: req.trx
  })

  req.team = form.related('team')

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  const fields = form.get('config').fields.filter(field => {
    return !_.includes(['text','hidden'], field.type)
  })

  const contact = await createOrUpdateContact(req, {
    form,
    fields,
    contactdata: req.body
  })

  const productfield = fields.find(field => {
    return field.type === 'productfield'
  })

  const invoice = productfield ? await handlePayment(req, {
    program: form.related('program'),
    contact,
    line_items: req.body[productfield.code].products,
    payment: req.body.payment
  }) : null

  const response = await Response.forge({
    team_id: form.get('team_id'),
    form_id: form.get('id'),
    contact_id: contact.get('id'),
    invoice_id: invoice ? invoice.get('id') : null,
    referer: req.body.referer,
    ipaddress: req.body.ipaddress,
    duration: parseInt(moment().format('YYYYMMDDHHmmss')) - req.body.starttime,
    is_known: contact.is_known,
    data: {
      ...req.body,
      ...req.body.payment ? {
        payment: {
          amount: req.body.payment.amount,
          method: req.body.payment.method,
          reference: req.body.payment.payment.reference
        }
      } : {}
    }
  }).save(null, {
    transacting: req.trx
  })

  await enrollInWorkflows(req, {
    contact,
    trigger_type: 'response',
    form_id: form.get('id'),
    response
  })

  await contactActivity(req, {
    contact,
    type: 'form',
    story: 'filled out a form',
    program_id: form.get('program_id'),
    data: {
      form: {
        id: form.get('id'),
        title: form.get('title')
      },
      response: {
        id: response.get('id')
      }
    }
  })

  await socket.refresh(req, [
    '/admin/crm/forms',
    `/admin/crm/forms/${form.get('id')}`,
    `/admin/crm/forms/${form.get('id')}/responses`
  ])

  res.status(200).respond(true)

}

export default submitRoute
