import collectObjects from '@core/utils/collect_objects'
import generateCode from '@core/utils/generate_code'
import SendEmailQueue from '../queues/send_email_queue'
import { AllHtmlEntities } from 'html-entities'
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


const _findOrCreateLink = async (req, { text, url }) => {

  const emailLink = await EmailLink.query(qb => {
    qb.where('text', text)
    qb.where('url', url)
  }).fetch({
    transacting: req.trx
  })

  if(emailLink) return emailLink

  const code = await generateCode(req, {
    table: 'maha_email_links'
  })

  return await EmailLink.forge({
    team_id: req.team.get('id'),
    code,
    text,
    url
  }).save(null, {
    transacting: req.trx
  })

}

export const encodeEmail = async(req, { code, header, html }) => {

  const parsed = cheerio.load(html)

  if(header) await parsed(header).prependTo('body')

  await parsed(`<img src="${process.env.WEB_HOST}/v${code}" alt="spacer.gif" />`).appendTo('body')

  const links = await parsed('a').map((i, elem) => ({
    text: parsed(elem).text().trim(),
    url: parsed(elem).attr('href').trim()
  })).get()

  const encoded = parsed.html()

  const decoded = AllHtmlEntities.decode(encoded)

  return await Promise.reduce(links, async (rendered, link) => {

    if(link.url.search(code) >= 0) return rendered

    const emailLink = await _findOrCreateLink(req, {
      text: link.text,
      url: link.url
    })

    return rendered.replace(link.url, `${process.env.WEB_HOST}/c${code}${emailLink.get('code')}`)

  }, decoded)

}

export const renderTemplate = async (req, options) => {

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

  const subject = ejs.render(options.subject || template.subject, options.data)

  const html = template.envelope !== false ? ejs.render(envelopeTemplate, { ...options.data, subject, content }) : content

  return { subject, html }

}

export const sendEmail = async(req, options) => {

  const { subject, html } = await renderTemplate(req, options)

  const code = await generateCode(req, {
    table: 'maha_emails'
  })

  const email = await Email.forge({
    team_id: options.team_id,
    user_id: options.user ? options.user.get('id') : null,
    from: process.env.EMAIL_FROM || options.from || 'Maha <mailer@mahaplatform.com>',
    reply_to: options.reply_to,
    to: options.to || options.user.get('rfc822'),
    subject,
    html,
    code,
    was_bounced: false,
    was_clicked: false,
    was_complained: false,
    was_delivered: false,
    was_opened: false,
    was_unsubscribed: false,
    was_webviewed: false
  }).save(null, {
    transacting: req.trx
  })

  await SendEmailQueue.enqueue(req, {
    id: email.get('id')
  })

}
