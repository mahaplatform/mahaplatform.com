import { updateMailingAddresses } from '../../../services/mailing_addresses'
import { updateEmailAddresses } from '../../../services/email_addresses'
import send_email_queue from '../../../../maha/queues/send_email_queue'
import { whitelist } from '../../../../../core/services/routes/params'
import { updatePhoneNumbers } from '../../../services/phone_numbers'
import { makePayment } from '../../../../finance/services/payments'
import generateCode from '../../../../../core/utils/generate_code'
import socket from '../../../../../core/services/routes/emitter'
import { contactActivity } from '../../../services/activities'
import LineItem from '../../../../finance/models/line_item'
import Invoice from '../../../../finance/models/invoice'
import Product from '../../../../finance/models/product'
import EmailAddress from '../../../models/email_address'
import { renderEmail } from '../../../services/email'
import Email from '../../../../maha/models/email'
import Response from '../../../models/response'
import Contact from '../../../models/contact'
import Sender from '../../../models/sender'
import Form from '../../../models/form'
import { checkToken } from './utils'
import numeral from 'numeral'
import moment from 'moment'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const summary  = fs.readFileSync(path.join(__dirname, 'summary.ejs'), 'utf8')

const getContact = async (req, { form, fields, data }) => {

  const email = await EmailAddress.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('address', data.email)
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  if(email) return email.related('contact')

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  return await Contact.forge({
    team_id: req.team.get('id'),
    code,
    ...whitelist(data, ['first_name','last_name','photo_id','birthday','spouse'])
  }).save(null, {
    transacting: req.trx
  })

}

const createInvoice = async (req, { form, contact, data }) => {

  const code = await generateCode(req, {
    table: 'finance_invoices'
  })

  const invoice = await Invoice.forge({
    team_id: req.team.get('id'),
    code,
    program_id: form.get('program_id'),
    customer_id: contact.get('id'),
    date: moment(),
    due: moment()
  }).save(null, {
    transacting: req.trx
  })

  await Promise.map(data.products, async(line_item) => {

    const product = await Product.scope(qb => {
      qb.where('team_id', req.team.get('id'))
    }).query(qb => {
      qb.where('id', line_item.product_id)
    }).fetch({
      transacting: req.trx
    })

    await LineItem.forge({
      team_id: req.team.get('id'),
      invoice_id: invoice.get('id'),
      product_id: product.get('id'),
      project_id: product.get('project_id'),
      revenue_type_id: product.get('revenue_type_id'),
      is_tax_deductible: product.get('is_tax_deductible'),
      description: product.get('title'),
      quantity: line_item.quantity,
      price: line_item.price,
      tax_rate: line_item.tax_rate,
      base_price: line_item.price,
      donation: 0.00
    }).save(null, {
      transacting: req.trx
    })

  })

  return invoice

}

const sendConfirmation = async(req, { form, fields, payment, response }) => {

  const contact = await Contact.query(qb => {
    qb.select(req.trx.raw('crm_contacts.*,crm_contact_primaries.*'))
    qb.leftJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    qb.where('crm_contacts.team_id', req.team.get('id'))
    qb.where('crm_contacts.id', response.get('contact_id'))
  }).fetch({
    transacting: req.trx
  })

  const data = response.get('data')

  const config = form.related('email').get('config')

  const code = await generateCode(req, {
    table: 'maha_emails'
  })

  const rendered = renderEmail(req, {
    config,
    subject: config.settings.subject,
    data: {
      contact: {
        full_name: contact.get('full_name'),
        first_name: contact.get('first_name'),
        last_name: contact.get('last_name'),
        email: contact.get('email')
      },
      response: fields.reduce((response, field) => ({
        ...response,
        [field.name.token]: data[field.code],
        ...field.type === 'productfield' ? {
          [`${field.name.token}_summary`]: ejs.render(summary, {
            summary: data[field.code],
            numeral,
            payment: {
              amount: payment.get('amount'),
              activity: payment.get('activity')
            }
          })
        } : {}
      }), {}),
      email: {
        web_link: `${process.env.WEB_HOST}/w${code}`,
        preferences_link: 'http://cornell.edu'
      }
    }
  })

  const sender = await Sender.query(qb => {
    qb.where('id', config.settings.sender_id)
  }).fetch({
    transacting: req.trx
  })

  const email = await Email.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    from: sender.get('rfc822'),
    reply_to: config.settings.reply_to,
    to: contact.get('rfc822'),
    subject: rendered.subject,
    html: rendered.html,
    code
  }).save(null, {
    transacting: req.trx
  })

  await send_email_queue.enqueue(req, {
    id: email.get('id')
  })

}

const submitRoute = async (req, res) => {

  if(!checkToken(req.headers.authorization, req.params.code)) {
    return res.status(401).send('Unauthorized')
  }

  const form = await Form.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['email','program','team'],
    transacting: req.trx
  })

  req.team = form.related('team')

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  const fields = form.get('config').fields.filter(field => {
    return field.type !== 'text'
  })

  const contactdata = fields.filter(field => {
    return field.type === 'contactfield'
  }).reduce((contactdata, field) => ({
    ...contactdata,
    [field.contactfield.name]: req.body[field.code]
  }), {})

  const contact = await getContact(req, {
    form,
    fields,
    data: contactdata
  })

  if(contactdata.email) {
    await updateEmailAddresses(req, {
      contact,
      email_addresses: [
        { address: contactdata.email }
      ],
      removing: false
    })
  }

  if(contactdata.phone) {
    await updatePhoneNumbers(req, {
      contact,
      phone_numbers: [
        { number: contactdata.phone }
      ],
      removing: false
    })
  }

  if(contactdata.address) {
    await updateMailingAddresses(req, {
      contact,
      mailing_addresses: [
        { address: contactdata.address }
      ],
      removing: false
    })
  }

  const productfield = fields.find(field => {
    return field.type === 'productfield'
  })

  const invoice = productfield ? await createInvoice(req, {
    form,
    contact,
    data: req.body[productfield.code]
  }) : null

  const payment = invoice ? await makePayment(req, {
    invoice,
    params: {
      merchant_id: form.get('program_id'),
      ...req.body.payment
    }
  }) : null

  const response = await Response.forge({
    team_id: form.get('team_id'),
    form_id: form.get('id'),
    contact_id: contact.get('id'),
    invoice_id: invoice ? invoice.get('id') : null,
    ipaddress: req.ip.split(':').pop(),
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

  await sendConfirmation(req, {
    form,
    fields,
    payment,
    response
  })

  await socket.refresh(req, [
    '/admin/crm/forms',
    `/admin/crm/forms/${form.get('id')}`,
    `/admin/crm/forms/${form.get('id')}/responses`
  ])

  res.status(200).respond(true)

}

export default submitRoute
