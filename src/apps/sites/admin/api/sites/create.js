import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import SiteSerializer from '@apps/sites/serializers/site_serializer'
import socket from '@core/services/routes/emitter'
import Manager from '@apps/sites/models/manager'
import Origin from '@apps/sites/models/origin'
import Site from '@apps/sites/models/site'

const createRoute = async (req, res) => {

  const site = await Site.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['title'])
  }).save(null, {
    transacting: req.trx
  })

  await Promise.mapSeries(req.body.origins.split('\n'), async(name) => {
    Origin.forge({
      team_id: req.team.get('id'),
      site_id: site.get('id'),
      name
    }).save(null, {
      transacting: req.trx
    })
  })

  Manager.forge({
    team_id: req.team.get('id'),
    site_id: site.get('id'),
    user_id: req.user.get('id'),
    role: 'administrator'
  }).save(null, {
    transacting: req.trx
  })

  await Manager.forge({
    team_id: req.team.get('id'),
    site_id: site.get('id'),
    user_id: req.user.get('id'),
    role: 'administrator'
  }).save(null, {
    transacting: req.trx
  })

  await site.load(['origins'], {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: site
  })

  await socket.refresh(req, [
    '/admin/sites/sites',
    `/admin/sites/sites/${site.get('id')}`
  ])

  res.status(200).respond(site, SiteSerializer)

}

export default createRoute
