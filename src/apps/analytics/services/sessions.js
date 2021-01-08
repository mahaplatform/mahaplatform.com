import Session from '@apps/analytics/models/session'
import App from '@apps/analytics/models/app'
import { getIPAddress } from './ipaddresses'
import { getReferer } from './referers'

export const getSession = async(req, { raw, user }) => {


  browser: {
    name: raw.get('br_name'),
    family: raw.get('br_family'),
    version: raw.get('br_version'),
    type: raw.get('br_type'),
    renderengine: raw.get('br_renderengine'),
    lang: raw.get('br_lang'),
    features_pdf: raw.get('br_features_pdf'),
    features_flash: raw.get('br_features_flash'),
    features_java: raw.get('br_features_java'),
    features_director: raw.get('br_features_director'),
    features_quicktime: raw.get('br_features_quicktime'),
    features_realplayer: raw.get('br_features_realplayer'),
    features_windowsmedia: raw.get('br_features_windowsmedia'),
    features_gears: raw.get('br_features_gears'),
    features_silverlight: raw.get('br_features_silverlight'),
    cookies: raw.get('br_cookies'),
    colordepth: raw.get('br_colordepth'),
    viewwidth: raw.get('br_viewwidth'),
    viewheight: raw.get('br_viewheight')
  },
  os: {
    name: raw.get('os_name'),
    family: raw.get('os_family'),
    manufacturer: raw.get('os_manufacturer'),
    timezone: raw.get('os_timezone')
  },
  device: {
    type: raw.get('dvce_type'),
    ismobile: raw.get('dvce_ismobile'),
    screenwidth: raw.get('dvce_screenwidth'),
    screenheight: raw.get('dvce_screenheight')
  },
  location: {
    country: raw.get('geo_country'),
    region: raw.get('geo_region'),
    region_name: raw.get('geo_region_name'),
    city: raw.get('geo_city'),
    zipcode: raw.get('geo_zipcode'),
    latitude: raw.get('geo_latitude'),
    longitude: raw.get('geo_longitude'),
    timezone: raw.get('geo_timezone')
  },
  ip: {
    isp: raw.get('ip_isp'),
    organization: raw.get('ip_organization'),
    domain: raw.get('ip_domain'),
    netspeed: raw.get('ip_netspeed')
  }

  const app = await App.fetchOrCreate({
    title: raw.get('app_id'),
    platform: raw.get('platform')
  }, {
    transacting: req.trx
  })

  const session = await Session.query(qb => {
    qb.where('user_id', user.get('id'))
    qb.where('app_id', app.get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(session) return session

  const referer = await getReferer(req, {
    raw
  })

  const ipaddress = await getIPAddress(req, {
    raw
  })

  return await Session.forge({
    user_id: user.get('id'),
    app_id: app.get('id'),
    referer_id: referer.get('id'),
    ipaddress_id: ipaddress.get('id')
  }).save(null, {
    transacting: req.trx
  })

}
