import DeviceSerializer from '@apps/maha/serializers/device_serializer'
import { createDevice } from '@apps/maha/services/device'

const createRoute = async (req, res) => {

  const device = await createDevice(req, req.trx)

  await device.load(['platform_type','device_type','os_name','browser_name'], {
    transacting: req.trx
  })

  res.status(200).respond(device, DeviceSerializer)

}

export default createRoute
