import MailingAddress from '../../../models/mailing_address'
import { encode } from '../../../../../core/services/jwt'
import EmailAddress from '../../../models/email_address'
import PhoneNumber from '../../../models/phone_number'
import Program from '../../../models/program'
import { readFile } from '../utils'
import path from 'path'
import ejs from 'ejs'

const models = {
  m: MailingAddress,
  e: EmailAddress,
  p: PhoneNumber
}

const getChannel = async(req, { type, code }) => {

  return await models[type].query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['contact.topics'],
    transacting: req.trx
  })

}

const showRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.where('code', req.params.program_code)
  }).fetch({
    withRelated: ['logo','team.logo','topics'],
    transacting: req.trx
  })

  req.team = program.related('team')

  const channel = await getChannel(req, {
    type: req.params.type,
    code: req.params.code
  })

  const team = program.related('team')

  const contact = channel.related('contact')

  const template = await readFile(path.join('crm','preferences','index.html'))

  const content = ejs.render(template, {
    contact: {},
    form: {
      email_address: req.params.type === 'e' ? {
        code: channel.get('code'),
        address: channel.get('address')
      } : null,
      phone_number: req.params.type === 'p' ? {
        code: channel.get('code'),
        number: channel.get('number')
      } : null,
      mailing_address: req.params.type === 'm' ? {
        code: channel.get('code'),
        address: channel.get('address')
      } : null,
      contact: {
        id: contact.get('id'),
        full_name: contact.get('full_name'),
        first_name: contact.get('first_name'),
        last_name: contact.get('last_name'),
        topic_ids: contact.related('topics').map(topic => topic.id)
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
      title: team.get('title'),
      logo: team.related('logo') ? team.related('logo').get('path') : null
    },
    token: encode({ code: channel.get('code') }, 60 * 30)
  })

  res.status(200).send(content)

}

export default showRoute
