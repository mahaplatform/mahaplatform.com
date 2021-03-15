import generateCode from '@core/utils/generate_code'
import { AllHtmlEntities } from 'html-entities'
import EmailLink from '../../models/email_link'
import cheerio from 'cheerio'

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

const encodeEmail = async(req, { code, header, html }) => {

  const parsed = cheerio.load(html)

  if(header) await parsed(header).prependTo('body')

  await parsed(`<img src="${process.env.ADMIN_HOST}/op/${code}" alt="spacer.gif" />`).appendTo('body')

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

    return rendered.replace(`href="${link.url}"`, `href="${process.env.ADMIN_HOST}/li/${code}${emailLink.get('code')}"`)

  }, decoded)

}

export default encodeEmail
