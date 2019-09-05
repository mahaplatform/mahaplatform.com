import generateCode from '../../../../../core/utils/generate_code'
import { contactActivity } from '../../../services/activities'
import EmailAddress from '../../../models/email_address'
import Program from '../../../../maha/models/program'
import Contact from '../../../models/contact'
import Consent from '../../../models/consent'
import moment from 'moment'

const getEmailAddress = async (req, { params }) => {

  const email_address = await EmailAddress.scope({
    team: req.team
  }).query(qb => {
    qb.where('address', params.email)
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  if(email_address) return email_address

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  const contact = await Contact.forge({
    team_id: req.team.get('id'),
    first_name: params.first_name,
    last_name: params.last_name,
    email: params.email,
    code,
    values: {}
  }).save(null, {
    transacting: req.trx
  })

  const email = await EmailAddress.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    address: params.email,
    is_primary: true
  }).save(null, {
    transacting: req.trx
  })

  await email.load(['contact'], {
    transacting: req.trx
  })

  return email

}

const getConsent = async (req, { program, email_address, params }) => {

  const consent = await Consent.scope({
    team: req.team
  }).query(qb => {
    qb.where('program_id', program.get('id'))
    qb.where('email_address_id', email_address.get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(consent !== null && consent.get('unsubscribed_at') !== null) {
    await consent.save({
      unsubscribed_at: null
    }, {
      transacting: req.trx
    })
  }

  if(consent) return consent

  const code = await generateCode(req, {
    table: 'crm_consents'
  })

  return await Consent.forge({
    team_id: req.team.get('id'),
    program_id: program.get('id'),
    email_address_id: email_address.get('id'),
    code
  }).save(null, {
    transacting: req.trx
  })

}

const subscribeContact = async (req, { program, params }) => {

  const email_address = await getEmailAddress(req, { params })

  await getConsent(req, { program, email_address, params })

  await contactActivity(req, {
    contact: email_address.related('contact'),
    type: 'subscription',
    story: 'subscribed to your program',
    data: {
      program: {
        id: program.get('id'),
        title: program.get('title')
      },
      email_address: {
        id: email_address.get('id'),
        address: email_address.get('address')
      }
    }
  })

}

const subscribeRoute = async (req, res) => {

  const program = await Program.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = program.related('team')

  if(!program) return res.status(404).send('Not Found')

  if(req.method === 'POST') {

    await subscribeContact(req, {
      program,
      params: req.body
    })

    return res.redirect(req.originalUrl)

  }

  res.status(200).render('subscribe', {
    moment,
    program: program,
    params: req.body
  })

}

export default subscribeRoute
