const getDeviceIcon = (platform, device, os, browser) => {
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

export default getDeviceIcon
