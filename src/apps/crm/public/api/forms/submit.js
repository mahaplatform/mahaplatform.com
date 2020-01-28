import { updateEmailAddresses } from '../../../services/email_addresses'
import { whitelist } from '../../../../../core/services/routes/params'
import generateCode from '../../../../../core/utils/generate_code'
import { contactActivity } from '../../../services/activities'
import { sendMail } from '../../../../../core/services/email'
import EmailAddress from '../../../models/email_address'
import { renderEmail } from '../../../services/email'
import Response from '../../../models/response'
import Contact from '../../../models/contact'
import Form from '../../../models/form'

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

const submitRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['email.sender','team'],
    transacting: req.trx
  })

  req.team = form.related('team')

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  const fields = form.get('config').fields

  const contactdata = fields.filter(field => {
    return field.type === 'contactfield'
  }).reduce((contactdata, field) => ({
    ...contactdata,
    [field.contactfield.name]: req.body[field.name]
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
        { address: contactdata.email, is_primary: true }
      ]
    })
  }

  const response = await Response.forge({
    team_id: form.get('team_id'),
    form_id: form.get('id'),
    contact_id: contact.get('id'),
    ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    data: req.body
  }).save(null, {
    transacting: req.trx
  })

  await contactActivity(req, {
    contact,
    type: 'form',
    story: 'filled out a form',
    program_id: form.get('program_id'),
    data: {}
  })

  const email = form.related('email')

  const data = response.get('data')

  const html = renderEmail(req, {
    config: email.get('config'),
    data: {
      response: fields.reduce((response, field) => ({
        ...response,
        [field.token]: data[field.name]
      }), {})
    }
  })

  await sendMail({
    from: email.related('sender').get('rfc822'),
    to: 'mochini@gmail.com',
    subject: email.get('subject'),
    html
  })

  res.status(200).respond(true)

}

export default submitRoute
