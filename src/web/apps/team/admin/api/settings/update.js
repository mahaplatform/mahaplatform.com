import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'

const updateRoute = async (req, res) => {

  await req.team.save({
    logo_id: req.body.logo_id,
    subdomain: req.body.title,
    title: req.body.title
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
    channel: 'user',
    action: 'session'
  })

  const serializer = (req, result) => ({
    title: result.get('title'),
    subdomain: result.get('subdomain'),
    logo_id: result.get('logo_id'),
    logo: result.related('logo').get('path')
  })

  res.status(200).respond(req.team, serializer)

}

export default updateRoute
