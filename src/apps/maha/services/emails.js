import collectObjects from '../../../core/utils/collect_objects'
import generateCode from '../../../core/utils/generate_code'
import send_email_queue from '../queues/send_email_queue'
import EmailLink from '../models/email_link'
import Email from '../models/email'
import pluralize from 'pluralize'
import cheerio from 'cheerio'
import numeral from 'numeral'
import moment from 'moment'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const emails = collectObjects('emails/*/index.js')

const templates = emails.reduce((emails, email) => ({
  ...emails,
  [`${email.config.code}:${email.default.code}`]: {
    subject: email.default.subject,
    envelope: email.default.envelope,
    filepath: email.filepath
  }
}), {})


const _findOrCreateLink = async (req, { email, link }) => {

  const emailLink = await EmailLink.where(link).fetch({
    transacting: req.trx
  })

  if(emailLink) return emailLink

  const code = await generateCode(req, {
    table: 'maha_email_links'
  })

  return await EmailLink.forge({
    team_id: email.get('team_id'),
    code,
    ...link
  }).save(null, {
    transacting: req.trx
  })

}

export const encodeEmail = async(req, { email }) => {

  const parsed = cheerio.load(email.get('html'))

  await parsed(`<img src="${process.env.WEB_HOST}/v${email.get('code')}" />`).appendTo('body')

  const links = await parsed('a').map((i, elem) => ({
    text: parsed(elem).text(),
    url: parsed(elem).attr('href')
  })).get()

  return await Promise.reduce(links, async (rendered, link) => {

    if(link.url.search(email.get('code')) >= 0) return rendered

    const emailLink = await _findOrCreateLink(req, {
      email,
      link
    })

    return rendered.replace(link.url, `${process.env.WEB_HOST}/c${email.get('code')}${emailLink.get('code')}`)

  }, parsed.html())

}

export const send_email = async(req, options) => {

  const template = templates[options.template]

  if(req.team) await req.team.load('logo', {
    transacting: req.trx
  })

  options.data = {
    moment,
    numeral,
    pluralize,
    _,
    team: req.team ? req.team.toJSON() : null,
    maha: options.maha !== undefined ? options.maha : true,
    host: process.env.WEB_HOST,
    ...options.data || {}
  }

  const contentTemplate = fs.readFileSync(path.join(template.filepath, 'html.ejs')).toString()

  const envelopeTemplate = fs.readFileSync(path.resolve(__dirname, '..', 'emails', 'envelope.ejs')).toString()

  const content = ejs.render(contentTemplate, options.data)

  const html = template.envelope !== false ? ejs.render(envelopeTemplate, { ...options.data, content }) : content

  const subject = options.subject || template.subject

  const code = await generateCode(req, {
    table: 'maha_emails'
  })

  const email = await Email.forge({
    team_id: options.team_id,
    user_id: options.user ? options.user.get('id') : null,
    from: options.from || 'Maha <mailer@mahaplatform.com>',
    reply_to: options.reply_to,
    to: options.to || options.user.get('rfc822'),
    subject: ejs.render(subject, options.data),
    html,
    code
  }).save(null, {
    transacting: req.trx
  })

  await send_email_queue.enqueue(req, {
    id: email.get('id')
  })

}
