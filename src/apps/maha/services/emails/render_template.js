import collectObjects from '@core/utils/collect_objects'
import pluralize from 'pluralize'
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

const renderTemplate = async (req, options) => {

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
    host: process.env.ADMIN_HOST,
    ...options.data || {}
  }

  const contentTemplate = fs.readFileSync(path.join(template.filepath, 'html.ejs')).toString()

  const envelopeTemplate = fs.readFileSync(path.resolve(__dirname,'..','..','emails','envelope.ejs')).toString()

  const content = ejs.render(contentTemplate, options.data)

  const subject = ejs.render(options.subject || template.subject, options.data)

  const html = template.envelope !== false ? ejs.render(envelopeTemplate, { ...options.data, subject, content }) : content

  return { subject, html }

}

export default renderTemplate
