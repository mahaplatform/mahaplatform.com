import Session from '@apps/analytics/models/session'
import App from '@apps/analytics/models/app'
import { getIPAddress } from './ipaddresses'
import { getCampaign } from './campaigns'
import { getContent } from './contents'
import { getReferer } from './referers'
import { getSource } from './sources'
import { getMedium } from './mediums'
import { getTerm } from './terms'

export const getSession = async(req, { data, user }) => {


  // browser: {
  //   name: raw.get('br_name'),
  //   family: raw.get('br_family'),
  //   version: raw.get('br_version'),
  //   type: raw.get('br_type'),
  //   renderengine: raw.get('br_renderengine'),
  //   lang: raw.get('br_lang'),
  //   features_pdf: raw.get('br_features_pdf'),
  //   features_flash: raw.get('br_features_flash'),
  //   features_java: raw.get('br_features_java'),
  //   features_director: raw.get('br_features_director'),
  //   features_quicktime: raw.get('br_features_quicktime'),
  //   features_realplayer: raw.get('br_features_realplayer'),
  //   features_windowsmedia: raw.get('br_features_windowsmedia'),
  //   features_gears: raw.get('br_features_gears'),
  //   features_silverlight: raw.get('br_features_silverlight'),
  //   cookies: raw.get('br_cookies'),
  //   colordepth: raw.get('br_colordepth'),
  //   viewwidth: raw.get('br_viewwidth'),
  //   viewheight: raw.get('br_viewheight')
  // },
  // os: {
  //   name: raw.get('os_name'),
  //   family: raw.get('os_family'),
  //   manufacturer: raw.get('os_manufacturer'),
  //   timezone: raw.get('os_timezone')
  // },
  // device: {
  //   type: raw.get('dvce_type'),
  //   ismobile: raw.get('dvce_ismobile'),
  //   screenwidth: raw.get('dvce_screenwidth'),
  //   screenheight: raw.get('dvce_screenheight')
  // },
  // location: {
  //   country: raw.get('geo_country'),
  //   region: raw.get('geo_region'),
  //   region_name: raw.get('geo_region_name'),
  //   city: raw.get('geo_city'),
  //   zipcode: raw.get('geo_zipcode'),
  //   latitude: raw.get('geo_latitude'),
  //   longitude: raw.get('geo_longitude'),
  //   timezone: raw.get('geo_timezone')
  // },
  // ip: {
  //   isp: raw.get('ip_isp'),
  //   organization: raw.get('ip_organization'),
  //   domain: raw.get('ip_domain'),
  //   netspeed: raw.get('ip_netspeed')
  // }

  const app = await App.fetchOrCreate({
    title: data.app_id,
    platform: data.platform
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

  const referer = data.page_referrer ? await getReferer(req, {
    data
  }) : null

  const ipaddress = await getIPAddress(req, {
    data
  })

  const source = data.mkt_source ? await getSource(req, {
    data
  }) : null

  const medium = data.mkt_medium ? await getMedium(req, {
    data
  }) : null

  const campaign = data.mkt_campaign ? await getCampaign(req, {
    data
  }) : null

  const term = data.mkt_term ? await getTerm(req, {
    data
  }) : null

  const content = data.mkt_content ? await getContent(req, {
    data
  }) : null

  return await Session.forge({
    user_id: user.get('id'),
    app_id: app.get('id'),
    referer_id: referer ? referer.get('id') : null,
    source_id: source ? source.get('id') : null,
    medium_id: medium ? medium.get('id') : null,
    campaign_id: campaign ? campaign.get('id') : null,
    term_id: term ? term.get('id') : null,
    content_id: content ? content.get('id') : null,
    ipaddress_id: ipaddress.get('id'),
    domain_sessionid: data.domain_sessionid,
    domain_sessionidx: data.domain_sessionidx
  }).save(null, {
    transacting: req.trx
  })

}
