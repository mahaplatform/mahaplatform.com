const getDevicePlatform = (ua) => {
  if(ua.match(/Cordova/)) return 'cordova'
  if(ua.match(/Electron/)) return 'electron'
  return 'web'
}

export default getDevicePlatform
