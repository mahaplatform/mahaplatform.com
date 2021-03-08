import socket from '@core/services/routes/emitter'
import Device from '@apps/maha/models/device'

const updateRoute = async (req, res) => {

  const device = await Device.where({
    fingerprint: req.params.fingerprint
  }).fetch({
    transacting: req.trx
  })

  const data = {}

  if(req.body.push_token !== null) data.push_token = req.body.push_token

  await device.save(data, {
    patch: true,
    transacting: req.trx
  })

  await socket.message(req, {
    channel: `/admin/devices/${device.get('id')}`,
    action: 'device'
  })

  await device.load(['sessions'], {
    transacting: req.trx
  })

  res.status(200).respond(true)

}

export default updateRoute
