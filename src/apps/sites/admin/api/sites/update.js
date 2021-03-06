import { activity } from '@core/services/routes/activities'
import SiteSerializer from '@apps/sites/serializers/site_serializer'
import socket from '@core/services/routes/emitter'
import Origin from '@apps/sites/models/origin'
import Site from '@apps/sites/models/site'

const updateRoute = async (req, res) => {

  const site = await Site.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!site) return res.status(404).respond({
    code: 404,
    message: 'Unable to load site'
  })

  await req.trx('sites_origins')
    .where('site_id', req.params.id)
    .delete()

  await Promise.mapSeries(req.body.origins.split('\n'), async(name) => {
    Origin.forge({
      team_id: req.team.get('id'),
      site_id: site.get('id'),
      name
    }).save(null, {
      transacting: req.trx
    })
  })

  await site.load(['origins'], {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: site
  })

  await socket.refresh(req, [
    '/admin/sites/sites',
    `/admin/sites/sites/${site.get('id')}`
  ])

  await res.status(200).respond(site, SiteSerializer)

}

export default updateRoute
