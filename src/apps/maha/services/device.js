import DeviceValue from '../models/device_value'
import Device from '../models/device'
import UAParser from 'ua-parser-js'
import _ from 'lodash'

export const createDevice = async (req, trx) => {

  const fingerprint = req.body.fingerprint

  const ua = UAParser(req.headers['user-agent'])

  const os_version_id = await findOrCreateDeviceValueId('os_version', ua.os.version, trx)

  const browser_version_id = await findOrCreateDeviceValueId('browser_version', ua.browser.version, trx)

  const device = await Device.where({ fingerprint }).fetch({ transacting: trx })

  if(device) return await device.save({
    os_version_id,
    browser_version_id
  }, { patch: true, transacting: trx })

  const platform_type = getPlatformType(req.headers['user-agent'])

  const platform_type_id = await findOrCreateDeviceValueId('platform_type', platform_type, trx)

  const device_type = ua.device.type ? ua.device.type.toLowerCase() : 'desktop'

  const device_type_id = await findOrCreateDeviceValueId('device_type', device_type, trx)

  const os_name = ua.os.name.toLowerCase()

  const os_name_id = await findOrCreateDeviceValueId('os_name', os_name, trx)

  const browser_name = ua.browser.name.toLowerCase()

  const browser_name_id = await findOrCreateDeviceValueId('browser_name', browser_name, trx)

  const icon = getDeviceIcon(platform_type, device_type, os_name, browser_name)

  const display_name = getDeviceDisplayName(platform_type, device_type, os_name, browser_name)

  const display_name_id = await findOrCreateDeviceValueId('display_name', display_name, trx)

  return await Device.forge({
    platform_type_id,
    os_version_id,
    browser_version_id,
    device_type_id,
    os_name_id,
    browser_name_id,
    display_name_id,
    fingerprint,
    icon
  }).save(null, { transacting: trx })

}

export const getDeviceIcon = (platform, device, os, browser) => {
  if(platform === 'web') {
    if(os === 'chromium') return 'chrome'
    if(browser === 'webkit') return 'safari'
    if(browser === 'mobile safari') return 'safari'
    if(browser === 'samsung browser') return 'android'
    return browser
  }
  if(platform === 'cordova') {
    if(os === 'ios') return 'apple'
    return os
  }
  if(platform === 'electron') {
    if(os === 'mac os') return 'apple'
    if(os === 'chromium') return 'chrome'
    return os
  }
}

export const getDeviceDisplayName = (platform, device, os, browser) => {

  const _getBrowser = () => {
    if(browser === 'mobile safari') return 'Safari'
    return _.startCase(browser)
  }

  const _getDevice = () => {
    if(device === 'desktop') return 'Desktop'
    if(device === 'tablet') return 'Tablet'
    if(device === 'mobile') return 'Phone'
  }

  const _getOS = () => {
    if(os === 'chromium os') return 'Chromebook'
    if(os === 'mac os') return 'Apple'
    if(os === 'ios') return 'Apple'
    return _.startCase(os)
  }

  const _getProduct = () => {
    const vendor = _getOS()
    const platform = _getDevice()
    if(vendor === 'Android' && platform === 'Phone') return 'Android'
    if(vendor === 'Apple' && platform === 'Phone') return 'iPhone'
    if(vendor === 'Apple' && platform === 'Tablet') return 'iPad'
    if(vendor === 'Apple' && platform === 'Desktop') return 'Macbook'
    if(vendor === 'Windows' && platform === 'Desktop') return 'Windows'
    return `${vendor} ${platform}`
  }

  const _getTarget = () => {
    if(platform !== 'web') return ''
    return `on ${_getProduct()}`
  }

  const software = platform === 'web' ? '' : 'App'

  const product = platform === 'web' ? _getBrowser() : _getProduct()

  const target = _getTarget()

  return `${product} ${software} ${target}`

}

const getPlatformType = (ua) => {

  if(ua.match(/Cordova/)) return 'cordova'

  if(ua.match(/Electron/)) return 'electron'

  return 'web'

}

export const findOrCreateDeviceValueId = async (type, text, trx) => {

  const value = await DeviceValue.where({ type, text }).fetch({ transacting: trx })

  if(value) return value.get('id')

  const newvalue = await DeviceValue.forge({ type, text }).save(null, { transacting: trx })

  if(newvalue) return newvalue.get('id')

}
