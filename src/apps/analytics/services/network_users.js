import Manufacturer from '@apps/analytics/models/manufacturer'
import NetworkUser from '@apps/analytics/models/network_user'
import Browser from '@apps/analytics/models/browser'
import Version from '@apps/analytics/models/version'
import Device from '@apps/analytics/models/device'
import OS from '@apps/analytics/models/os'
import UAParser from 'ua-parser-js'

export const getNetworkUser = async(req, { data }) => {

  const network_user = await NetworkUser.query(qb => {
    qb.where('network_userid', data.network_userid)
  }).fetch({
    transacting: req.trx
  })

  if(network_user) return network_user

  const ua = UAParser(data.useragent)

  const device = await Device.fetchOrCreate({
    text: ua.device.type || 'computer'
  },{
    transacting: req.trx
  })

  const manufacturer = ua.device.vendor ? await Manufacturer.fetchOrCreate({
    text: ua.device.vendor
  },{
    transacting: req.trx
  }) : null

  const os = await OS.fetchOrCreate({
    text: ua.os.name
  },{
    transacting: req.trx
  })

  const os_version = await Version.fetchOrCreate({
    text: ua.os.version
  },{
    transacting: req.trx
  })

  const browser = await Browser.fetchOrCreate({
    text: ua.browser.name
  },{
    transacting: req.trx
  })

  const browser_version = await Version.fetchOrCreate({
    text: ua.browser.major
  },{
    transacting: req.trx
  })

  return await NetworkUser.forge({
    device_id: device.get('id'),
    manufacturer_id: manufacturer ? manufacturer.get('id') : null,
    os_id: os.get('id'),
    os_version_id: os_version.get('id'),
    browser_id: browser.get('id'),
    browser_version_id: browser_version.get('id'),
    network_userid: data.network_userid
  }).save(null, {
    transacting: req.trx
  })

}
