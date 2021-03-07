import _ from 'lodash'

const getDeviceName = (platform, device, os, browser) => {

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

export default getDeviceName
