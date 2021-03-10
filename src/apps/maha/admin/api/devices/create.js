import DeviceSerializer from '@apps/maha/serializers/device_serializer'
import { getDevice } from '@apps/maha/services/devices'

const createRoute = async (req, res) => {

  const device = await getDevice(req, {
    fingerprint: req.body.fingerprint
  })

  await res.status(200).respond(device, DeviceSerializer)

}

export default createRoute
