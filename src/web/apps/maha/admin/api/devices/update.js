import { Route } from '../../../../../core/backframe'
import socket from '../../../../../core/services/emitter'
import Device from '../../../models/device'

const processor = async (req, trx, options) => {

  const device = await Device.where({
    fingerprint: req.params.fingerprint
  }).fetch({ transacting: trx })

  const data = {}

  if(req.body.push_token !== null) data.push_token = req.body.push_token

  await device.save(data, {
    patch: true,
    transacting: trx
  })

  await socket.in(`/admin/devices/${device.get('id')}`).emit('message', {
    action: 'device',
    data: null
  })

  await device.load(['sessions'], { transacting: trx })

  await Promise.map(device.related('sessions').toArray(), async (session) => {

    await socket.in(`/admin/users/${session.get('user_id')}`).emit('message', {
      action: 'session',
      data: null
    })

  })

  return true

}

const updateRoute = new Route({
  authenticated: false,
  method: 'patch',
  path: '/:fingerprint',
  processor
})

export default updateRoute
