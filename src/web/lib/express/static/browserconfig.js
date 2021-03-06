import Website from '@apps/websites/models/website'
import knex from '@core/vendor/knex/maha'
import { icon } from './utils.js'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const template = fs.readFileSync(path.resolve(__dirname,'templates','browserconfig.xml.ejs'), 'utf8')

const browserconfigRoute = async (req, res) => {

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

    const browserconfig = ejs.render(template, {
      config: website.get('config'),
      favicon: website.related('favicon'),
      icon,
      website
    })

    await res.status(200).type('application/xml').send(browserconfig)

  }).catch(err => {
    res.status(500).send('Application Error')
  })

}

export default browserconfigRoute
