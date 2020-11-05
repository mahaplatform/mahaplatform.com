import MailingAddress from '../../models/mailing_address'
import { encode } from '@core/services/jwt'
import EmailAddress from '../../models/email_address'
import PhoneNumber from '../../models/phone_number'
import Email from '@apps/maha/models/email'
import Program from '../../models/program'
import Consent from '../../models/consent'
import { readFile } from './utils'
import path from 'path'
import ejs from 'ejs'
import _ from 'lodash'

const models = {
  m: { model: MailingAddress, key: 'mailing_address_id', type: 'mail' },
  e: { model: EmailAddress, key: 'email_address_id', type: 'email' },
  v: { model: PhoneNumber, key: 'phone_number_id', type: 'voice' },
  s: { model: PhoneNumber, key: 'phone_number_id', type: 'sms' }
}

const getChannel = async(req, { type, code }) => {
  return await models[type].model.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('code', code)
  }).fetch({
    withRelated: ['contact.topics'],
    transacting: req.trx
  })
}

const getProgram = async (req, { email_code, program_code }) => {

  if(email_code) {
    const email = await Email.query(qb => {
      qb.where('code', req.params.email_code)
    }).fetch({
      withRelated: ['email_campaign.program.team','email_campaign.program.logo','email_campaign.program.topics'],
      transacting: req.trx
    })

    if(email.get('email_campaign_id')) {
      await email.load(['email_campaign.program.team','email_campaign.program.logo','email_campaign.program.topics'], {
        transacting: req.trx
      })
      return email.related('email_campaign').related('program')
    }

    if(email.get('email_id')) {
      await email.load(['email.program.team','email.program.logo','email.program.topics'], {
        transacting: req.trx
      })
      return email.related('email').related('program')
    }

  }

  return await Program.query(qb => {
    qb.where('code', req.params.program_code)
  }).fetch({
    withRelated: ['team','logo','topics'],
    transacting: req.trx
  })

}

const preferencesRoute = async (req, res) => {

  const program = await getProgram(req, req.params)

  req.team = program.related('team')

  const type = req.params.type || 'e'

  const channel = await getChannel(req, {
    code: req.params.channel_code,
    type
  })

  const consent = await Consent.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('program_id', program.get('id'))
    qb.where(models[type].key, channel.get('id'))
  }).fetch({
    transacting: req.trx
  })

  const contact = channel.related('contact')

  const template = await readFile(path.join('crm','preferences','index.html'))

  const content = ejs.render(template, {
    form: {
      type: models[type].type,
      email_code: req.params.email_code,
      email_address: type === 'e' ? {
        code: channel.get('code'),
        address: channel.get('address')
      } : null,
      phone_number: _.includes(['s','v'], type) ? {
        code: channel.get('code'),
        number: channel.get('number')
      } : null,
      mailing_address: type === 'm' ? {
        code: channel.get('code'),
        address: channel.get('address')
      } : null,
      contact: {
        id: contact.get('id'),
        full_name: contact.get('full_name'),
        first_name: contact.get('first_name'),
        last_name: contact.get('last_name'),
        topic_ids: contact.related('topics').map(topic => topic.id),
        optout: consent && consent.get('optedout_at') ? true: false
      },
      program: {
        code: program.get('code'),
        logo: program.related('logo') ? program.related('logo').get('path') : null,
        title: program.get('title')
      },
      topics: program.related('topics').map(topic => ({
        id: topic.get('id'),
        title: topic.get('title')
      }))
    },
    program: {
      title: program.get('title'),
      logo: program.related('logo') ? program.related('logo').get('path') : null
    },
    team: {
      title: req.team.get('title'),
      logo: req.team.related('logo') ? req.team.related('logo').get('path') : null
    },
    token: encode({ code: channel.get('code') }, 60 * 30)
  })

  res.status(200).send(content)

}

export default preferencesRoute
