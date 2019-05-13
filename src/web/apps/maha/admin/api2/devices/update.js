import { message } from '../../../../../core/services/routes/emitter'
import Device from '../../../models/device'

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

  await message(req, {
    channel: `/admin/devices/${device.get('id')}`,
    action: 'device'
  })

  await device.load(['sessions'], {
    transacting: req.trx
  })

  await Promise.map(device.related('sessions').toArray(), async (session) => {

    await message(req, {
      channel: `/admin/users/${session.get('user_id')}`,
      action: 'session'
    })

  })

  res.status(200).respond(true)

}

export default updateRoute
