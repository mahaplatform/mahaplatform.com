import Manufacturer from '@apps/analytics/models/manufacturer'
import Useragent from '@apps/analytics/models/useragent'
import Browser from '@apps/analytics/models/browser'
import Version from '@apps/analytics/models/version'
import Device from '@apps/analytics/models/device'
import OS from '@apps/analytics/models/os'
import UAParser from 'ua-parser-js'

export const getUseragent = async(req, { data }) => {

  const useragent = await Useragent.query(qb => {
    qb.where('useragent', data.useragent)
  }).fetch({
    transacting: req.analytics
  })

  if(useragent) return useragent

  const ua = UAParser(data.useragent)

  const device = await Device.fetchOrCreate({
    text: ua.device.type || 'computer'
  },{
    transacting: req.analytics
  })

  const manufacturer = ua.device.vendor ? await Manufacturer.fetchOrCreate({
    text: ua.device.vendor
  },{
    transacting: req.analytics
  }) : null

  const os = ua.os.name ? await OS.fetchOrCreate({
    text: ua.os.name
  },{
    transacting: req.analytics
  }): null

  const os_version = ua.os.version ? await Version.fetchOrCreate({
    text: ua.os.version
  },{
    transacting: req.analytics
  }) : null

  const browser = ua.browser.name ? await Browser.fetchOrCreate({
    text: ua.browser.name
  },{
    transacting: req.analytics
  }): null

  const browser_version = ua.browser.major ? await Version.fetchOrCreate({
    text: ua.browser.major
  },{
    transacting: req.analytics
  }) : null

  return await Useragent.forge({
    device_id: device.get('id'),
    manufacturer_id: manufacturer ? manufacturer.get('id') : null,
    os_id: os ? os.get('id') : null,
    os_version_id: os_version ? os_version.get('id') : null,
    browser_id: browser ? browser.get('id') : null,
    browser_version_id: browser_version ? browser_version.get('id') : null,
    useragent: data.useragent
  }).save(null, {
    transacting: req.analytics
  })

}
