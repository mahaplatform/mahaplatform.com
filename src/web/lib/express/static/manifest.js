import Website from '@apps/websites/models/website'
import knex from '@core/vendor/knex/maha'
import { icon } from './utils.js'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const template = fs.readFileSync(path.resolve(__dirname,'templates','manifest.json.ejs'), 'utf8')

const manifestMiddleware = async (req, res) => {

  knex.transaction(async (maha) => {

    req.trx = maha

    const website = await Website.query(qb => {
      qb.where('code', req.params.code)
    }).fetch({
      withRelated: ['favicon'],
      transacting: req.trx
    })

    if(!website) return res.status(404).respond({
      code: 404,
      message: 'Unable to load website'
    })

    const manifest = ejs.render(template, {
      config: website.get('config'),
      favicon: website.related('favicon'),
      icon,
      website
    })

    await res.status(200).type('application/json').send(manifest)

  }).catch(err => {
    res.status(500).send('Application Error')
  })

}

export default manifestMiddleware
