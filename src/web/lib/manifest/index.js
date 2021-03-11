import Website from '@apps/websites/models/website'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const getFavicon = (favicon) => {
  if(!favicon) return
  const extname = path.extname(favicon.get('path'))
  return {
    basename: favicon.get('path').replace(extname, ''),
    extname: extname.substr(1)
  }
}

const template = fs.readFileSync(path.resolve(__dirname, 'manifest.json.ejs'), 'utf8')

const manifestMiddleware = async (req, res) => {

  const website = await Website.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['domains','favicon'],
    transacting: req.trx
  })

  if(!website) return res.status(404).respond({
    code: 404,
    message: 'Unable to load website'
  })

  const manifest = ejs.render(template, {
    website,
    favicon: getFavicon(website.related('favicon'))
  })

  await res.status(200).send(manifest)

}

export default manifestMiddleware
