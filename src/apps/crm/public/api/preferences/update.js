import { updateRelated } from '../../../../../core/services/routes/relations'
import MailingAddress from '../../../models/mailing_address'
import { decode } from '../../../../../core/services/jwt'
import EmailAddress from '../../../models/email_address'
import PhoneNumber from '../../../models/phone_number'
import Program from '../../../models/program'
import { checkToken } from '../utils'

import Consent from '../../../models/consent'
import moment from 'moment'

const updateConsent = async(req, { optout, email_address, program }) => {

  const consent = await Consent.query(qb => {
    qb.where('email_address_id',  email_address.get('id'))
    qb.where('program_id',  program.get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(consent && optout) {
    await consent.save({
      optedout_at: moment(),
      optout_reason: null,
      optout_reason_other: null
    }, {
      transacting: req.trx,
      patch: true
    })
  }

  if(consent && !optout) {
    await consent.save({
      optedin_at: moment(),
      optedout_at: null,
      optout_reason: null,
      optout_reason_other: null
    }, {
      transacting: req.trx,
      patch: true
    })
  }

  if(!consent) {
    await Consent.forge({
      team_id: req.team.get('id'),
      email_address_id: email_address.get('id'),
      code: 'abcde12345',
      optedin_at: moment(),
      optedout_at: optout ? moment() : null,
      optout_reason: null,
      optout_reason_other: null
    })
  }

}

const updateRoute = async (req, res) => {

  if(!checkToken(req.headers.authorization, req.params.code)) {
    return res.status(401).send('Unauthorized')
  }

  const program = await Program.query(qb => {
    qb.where('code', req.params.program_code)
  }).fetch({
    transacting: req.trx
  })

  const email_address = await EmailAddress.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  const contact = email_address.related('contact')

  await contact.save({
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }, {
    transacting: req.trx,
    patch: true
  })

  await updateRelated(req, {
    object: contact,
    related: 'topics',
    table: 'crm_interests',
    ids: req.body.topic_ids,
    foreign_key: 'contact_id',
    related_foreign_key: 'topic_id'
  })

  await updateConsent(req, {
    optout: req.body.consent,
    email_address,
    program
  })

  res.status(200).respond(contact)

}

export default updateRoute
