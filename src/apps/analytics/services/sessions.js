import Manufacturer from '@apps/analytics/models/manufacturer'
import Campaign from '@apps/analytics/models/campaign'
import Session from '@apps/analytics/models/session'
import Content from '@apps/analytics/models/content'
import Browser from '@apps/analytics/models/browser'
import Version from '@apps/analytics/models/version'
import Source from '@apps/analytics/models/source'
import Medium from '@apps/analytics/models/medium'
import Device from '@apps/analytics/models/device'
import Term from '@apps/analytics/models/term'
import App from '@apps/analytics/models/app'
import { getIPAddress } from './ipaddresses'
import OS from '@apps/analytics/models/os'
import { getReferer } from './referers'
import UAParser from 'ua-parser-js'

export const getSession = async(req, { data, domain_user }) => {

  const app = await App.fetchOrCreate({
    title: data.app_id,
    platform: data.platform
  }, {
    transacting: req.trx
  })

  const session = await Session.query(qb => {
    qb.where('domain_user_id', domain_user.get('id'))
    qb.where('app_id', app.get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(session) return session

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

  const os = ua.os.name ? await OS.fetchOrCreate({
    text: ua.os.name
  },{
    transacting: req.trx
  }): null

  const os_version = ua.os.version ? await Version.fetchOrCreate({
    text: ua.os.version
  },{
    transacting: req.trx
  }) : null

  const browser = ua.browser.name ? await Browser.fetchOrCreate({
    text: ua.browser.name
  },{
    transacting: req.trx
  }): null

  const browser_version = ua.browser.major ? await Version.fetchOrCreate({
    text: ua.browser.major
  },{
    transacting: req.trx
  }) : null

  const referer = data.page_referrer ? await getReferer(req, {
    data
  }) : null

  const ipaddress = await getIPAddress(req, {
    data
  })

  const source = data.mkt_source ? await Source.fetchOrCreate({
    text: data.mkt_source
  },{
    transacting: req.trx
  }) : null

  const medium = data.mkt_medium ? await Medium.fetchOrCreate({
    text: data.mkt_source
  },{
    transacting: req.trx
  }) : null

  const campaign = data.mkt_campaign ? await Campaign.fetchOrCreate({
    text: data.mkt_campaign
  },{
    transacting: req.trx
  }) : null

  const term = data.mkt_term ? await Term.fetchOrCreate({
    text: data.mkt_term
  },{
    transacting: req.trx
  }) : null

  const content = data.mkt_content ? await Content.fetchOrCreate({
    text: data.mkt_content
  },{
    transacting: req.trx
  }) : null

  return await Session.forge({
    domain_user_id: domain_user.get('id'),
    app_id: app.get('id'),
    device_id: device.get('id'),
    manufacturer_id: manufacturer ? manufacturer.get('id') : null,
    os_id: os ? os.get('id') : null,
    os_version_id: os_version ? os_version.get('id') : null,
    browser_id: browser ? browser.get('id') : null,
    browser_version_id: browser_version ? browser_version.get('id') : null,
    referer_id: referer ? referer.get('id') : null,
    source_id: source ? source.get('id') : null,
    medium_id: medium ? medium.get('id') : null,
    campaign_id: campaign ? campaign.get('id') : null,
    term_id: term ? term.get('id') : null,
    content_id: content ? content.get('id') : null,
    ipaddress_id: ipaddress.get('id'),
    domain_sessionid: data.domain_sessionid
  }).save(null, {
    transacting: req.trx
  })

}
