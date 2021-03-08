import DeviceValue from '@apps/maha/models/device_value'
import getDevicePlatform from './get_device_platform'
import Device from '@apps/maha/models/device'
import getDeviceIcon from './get_device_icon'
import getDeviceName from './get_device_name'
import UAParser from 'ua-parser-js'

export const findOrCreateDeviceValueId = async (req, type, text) => {
  console.log({ type, text })
  const value = await DeviceValue.fetchOrCreate({
    type,
    text
  }, {
    transacting: req.trx
  })
  return value.get('id')
}

const getDevice = async (req, { fingerprint }) => {

  const user_agent = req.headers['user-agent']

  const device = await Device.where({
    fingerprint
  }).fetch({
    withReleated: ['platform_type','device_type','os_name','browser_name'],
    transacting: req.trx
  })

  if(!user_agent && device) return device

  const ua = UAParser(req.headers['user-agent'])

  const os_version_id = await findOrCreateDeviceValueId(req, 'os_version', ua.os.version)

  const browser_version_id = await findOrCreateDeviceValueId(req, 'browser_version', ua.browser.version)

  if(device) {
    return await device.save({
      os_version_id,
      browser_version_id
    }, {
      transacting: req.trx,
      patch: true
    })
  }

  const platform_type = getDevicePlatform(req.headers['user-agent'])

  const platform_type_id = await findOrCreateDeviceValueId(req, 'platform_type', platform_type)

  const device_type = ua.device.type ? ua.device.type.toLowerCase() : 'desktop'

  const device_type_id = await findOrCreateDeviceValueId(req, 'device_type', device_type)

  const os_name = ua.os.name.toLowerCase()

  const os_name_id = await findOrCreateDeviceValueId(req, 'os_name', os_name)

  const browser_name = ua.browser.name.toLowerCase()

  const browser_name_id = await findOrCreateDeviceValueId(req, 'browser_name', browser_name)

  const icon = getDeviceIcon(platform_type, device_type, os_name, browser_name)

  const display_name = getDeviceName(platform_type, device_type, os_name, browser_name)

  const display_name_id = await findOrCreateDeviceValueId(req, 'display_name', display_name)

  const newdevice = await Device.forge({
    platform_type_id,
    os_version_id,
    browser_version_id,
    device_type_id,
    os_name_id,
    browser_name_id,
    display_name_id,
    fingerprint,
    icon
  }).save(null, {
    transacting: req.trx
  })

  await newdevice.load(['platform_type','device_type','os_name','browser_name'], {
    transacting: req.trx
  })

  return newdevice

}

export default getDevice
