import ShortLinkSerializer from '../../../serializers/shortlink_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import generateCode from '@core/utils/generate_code'
import socket from '@core/services/routes/emitter'
import ShortLink from '../../../models/shortlink'

const createRoute = async (req, res) => {

  const existing =  await ShortLink.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('url', req.body.url)
  }).fetch({
    transacting: req.trx
  })

  if(existing) return res.status(200).respond(existing, ShortLinkSerializer)

  const code = await generateCode(req, {
    table: 'maha_shortlinks',
    length: 4
  })

  const shortlink = await ShortLink.forge({
    team_id: req.team.get('id'),
    code,
    ...whitelist(req.body, ['url'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: shortlink
  })

  await socket.refresh(req, [
    '/admin/team/shortlinks'
  ])

  res.status(200).respond(shortlink, ShortLinkSerializer)

}

export default createRoute
