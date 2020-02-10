import generateCode from '../../../core/utils/generate_code'
import { sendMail } from '../../../core/services/email'
import Queue from '../../../core/objects/queue'
import EmailLink from '../models/email_link'
import Email from '../models/email'
import cheerio from 'cheerio'

const processor = async (job, trx) => {

  const email = await Email.where({
    id: job.data.id
  }).fetch({
    withRelated: ['team'],
    transacting: trx
  })

  const parsed = cheerio.load(email.get('html'))

  await parsed(`<img src="${process.env.WEB_HOST}/v${email.get('code')}" />`).appendTo('body')

  const links = await parsed('a').map((i, elem) => ({
    text: parsed(elem).text(),
    url: parsed(elem).attr('href')
  })).get()

  const rendered = {
    from: email.get('from'),
    to: email.get('to'),
    reply_to: email.get('reply_to') || 'no-reply@mahaplatform.com',
    subject: email.get('subject'),
    html: parsed.html()
  }

  const mapped = await Promise.reduce(links, async (rendered, link) => {
    if(link.url.search(email.get('code')) >= 0) return rendered
    const emailLink = await _findOrCreateLink({ trx }, { email, link })
    const newUrl = `${process.env.WEB_HOST}/c${email.get('code')}${emailLink.get('code')}`
    return {
      ...rendered,
      html: rendered.html.replace(link.url, newUrl)
    }
  }, rendered)

  const result = await sendMail(mapped)

  await email.save(result, {
    patch: true,
    transacting: trx
  })

}

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

const mailerQueue = new Queue({
  name: 'send_email',
  enqueue: async (req, job) => job,
  processor
})

export default mailerQueue
