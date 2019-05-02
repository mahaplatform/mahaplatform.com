import { getDeviceIcon, getDeviceDisplayName, findOrCreateDeviceValueId } from '../../services/device'
import Migration from '../../core/objects/migration'
import Device from '../../models/device'

const AddDeviceIconDisplayName = new Migration({

  up: async (knex) => {

    const devices = await Device.fetchAll({
      transacting: null,
      withRelated: ['platform_type', 'device_type', 'os_name', 'browser_name']
    })

    await Promise.map(devices.toArray(), async device => {

      const platform_type = device.related('platform_type').get('text')
      const device_type = device.related('device_type').get('text')
      const os_name = device.related('os_name').get('text')
      const browser_name = device.related('browser_name').get('text')
      const display_name = getDeviceDisplayName(platform_type, device_type, os_name, browser_name)
      const display_name_id = await findOrCreateDeviceValueId('display_name', display_name, null)
      const icon = getDeviceIcon(platform_type, device_type, os_name, browser_name)

      await device.save({ icon, display_name_id })

    })

  },

  down: async (knex) => {}

})

export default AddDeviceIconDisplayName
