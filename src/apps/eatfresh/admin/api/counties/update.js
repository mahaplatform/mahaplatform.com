import CountySerializer from '../../../serializers/county_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import County from '../../../models/county'

const updateRoute = async (req, res) => {

  const county = await County.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!county) return res.status(404).respond({
    code: 404,
    message: 'Unable to load county'
  })

  await county.save(whitelist(req.body, ['name']), {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: county
  })

  await socket.refresh(req, [
    '/admin/eatfresh/counties'
  ])

  res.status(200).respond(county, CountySerializer)
}

export default updateRoute
