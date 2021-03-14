import Website from '@apps/websites/models/website'
import knex from '@core/vendor/knex/maha'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const template = fs.readFileSync(path.resolve(__dirname,'templates','robots.txt.ejs'), 'utf8')

const robotsRoute = async (req, res) => {

  knex.transaction(async (maha) => {

    req.trx = maha

    const website = await Website.query(qb => {
      qb.where('code', req.params.code)
    }).fetch({
      withRelated: ['primary_domain'],
      transacting: req.trx
    })

    if(!website) return res.status(404).respond({
      code: 404,
      message: 'Unable to load website'
    })

    const robots = ejs.render(template, {
      config: website.get('config'),
      domain: website.related('primary_domain').get('name'),
      website
    })

    await res.status(200).type('text/plain').send(robots)

  }).catch(err => {
    res.status(500).send('Application Error')
  })

}

export default robotsRoute