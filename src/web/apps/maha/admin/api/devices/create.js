import DeviceSerializer from '../../../serializers/device_serializer'
import { createDevice } from '../../../services/device'

const createRoute = async (req, res) => {

  const device = await createDevice(req, req.trx)

  await device.load(['platform_type','device_type','os_name','browser_name'], {
    transacting: req.trx
  })

  res.status(200).respond(device, (device) => {
    return DeviceSerializer(req, device)
  })

}

export default createRoute
