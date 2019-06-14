import CountySerializer from '../../../serializers/county_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import County from '../../../models/county'

const createRoute = async (req, res) => {

  const county = await County.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['name'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: county
  })

  await socket.refresh(req, [
    '/admin/eatfresh/counties'
  ])

  res.status(200).respond(county, (county) => {
    return CountySerializer(req, req.trx, county)
  })

}

export default createRoute
