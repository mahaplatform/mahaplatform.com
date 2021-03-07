import socket from '@core/services/routes/emitter'

const seenRoute = async (req, res) => {

  await req.trx('maha_notifications').where(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('user_id', req.user.get('id'))
    qb.where('is_seen', false)
  }).update({
    is_seen: true
  })

  await socket.refresh(req, {
    channel: 'user',
    target: '/admin/notifications/unread'
  })

  res.status(200).respond(true)

}

export default seenRoute
