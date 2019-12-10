import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import TeamSerializer from '../../../serializers/team_serializer'
import socket from '../../../../../core/services/routes/emitter'

const updateRoute = async (req, res) => {

  await req.team.save({
    ...whitelist(req.body, ['title','address','subdomain','logo_id','authentication_strategy'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: req.team,
    object_text: 'team settings',
    object_url: '/admin/team/settings'
  })

  await socket.refresh(req, [
    '/admin/team/settings'
  ])

  await socket.message(req, {
    channel: 'team',
    action: 'session'
  })

  res.status(200).respond(req.team, TeamSerializer)

}

export default updateRoute
