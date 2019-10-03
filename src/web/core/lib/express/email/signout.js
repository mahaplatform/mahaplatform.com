import Session from '../../../../../apps/maha/models/session'
import socket from '../../../services/emitter'

const signoutRoute = async (req, res) => {

  const session = await Session.where({
    code: req.params.code
  }).fetch({
    withRelated: ['user'],
    transacting: req.trx
  })

  await socket.in(`/admin/sessions/${session.get('id')}`).emit('message', {
    action: 'signout'
  })

  await session.related('user').save({
    is_blocked: true
  }, {
    patch: true,
    transacting: req.trx
  })

  res.send('signed out')

}

export default signoutRoute
