import './core/vendor/sourcemaps'
import './core/services/environment'
import nsq from 'nsqjs'
import Knex from 'knex'

const keys = [
  // app
  'app_id','platform',
  // date/time
  'etl_tstamp','collector_tstamp','dvce_created_tstamp',
  // event
  'event','event_id','txn_id',
  // versioning
  'name_tracker','v_tracker','v_collector','v_etl',
  // user/visit
  'user_id','user_ipaddress','user_fingerprint','domain_userid','domain_sessionidx','network_userid',
  // location
  'geo_country','geo_region','geo_city','geo_zipcode','geo_latitude','geo_longitude','geo_region_name',
  // ip lookups
  'ip_isp','ip_organization','ip_domain','ip_netspeed',
  // page
  'page_url','page_title','page_referrer','page_urlscheme','page_urlhost','page_urlport','page_urlpath','page_urlquery','page_urlfragment',
  // referal
  'refr_urlscheme','refr_urlhost','refr_urlport','refr_urlpath','refr_urlquery','refr_urlfragment','refr_medium','refr_source','refr_term',
  // marketing
  'mkt_medium','mkt_source','mkt_term','mkt_content','mkt_campaign',
  // contexts
  'contexts',
  // custom structured events
  'se_category','se_action','se_label','se_property','se_value',
  // unstruct_event
  'unstruct_event',
  // ecommerce
  'tr_orderid','tr_affiliation','tr_total','tr_tax','tr_shipping','tr_city','tr_state','tr_country','ti_orderid','ti_sku','ti_name','ti_category','ti_price','ti_quantity',
  // page ping
  'pp_xoffset_min','pp_xoffset_max','pp_yoffset_min','pp_yoffset_max',
  // useragent
  'useragent',
  // browser
  'br_name','br_family','br_version','br_type','br_renderengine','br_lang','br_features_pdf','br_features_flash','br_features_java','br_features_director','br_features_quicktime','br_features_realplayer','br_features_windowsmedia','br_features_gears','br_features_silverlight','br_cookies','br_colordepth','br_viewwidth','br_viewheight',
  // operating system
  'os_name','os_family','os_manufacturer','os_timezone',
  // device
  'dvce_type','dvce_ismobile','dvce_screenwidth','dvce_screenheight',
  // document
  'doc_charset','doc_width','doc_height',
  // currency
  'tr_currency','tr_total_base','tr_tax_base','tr_shipping_base','ti_currency','ti_price_base','base_currency',
  // geolocation
  'geo_timezone',
  // clickid
  'mkt_clickid','mkt_network',
  // etl_tags
  'etl_tags',
  'dvce_sent_tstamp',
  'refr_domain_userid','refr_dvce_tstamp',
  'derived_contexts',
  'domain_sessionid',
  'derived_tstamp',
  'event_vendor','event_name','event_format','event_version','event_fingerprint',
  'true_tstamp'
]

const getUser = async(knex, params) => {

  const { domain_userid, network_userid, user_id = null } = params

  const user = await knex('users').where({
    domain_userid,
    network_userid
  }).then(results => results[0])

  if(user && user.user_id === user_id) {
    return user
  }

  if(user) {
    return await knex('users').where('id', user.id).update({
      user_id
    }).then(results => results[0])
  }

  return await knex('users').insert({
    domain_userid,
    network_userid
  }).then(results => results[0])

}

const getApp = async(knex, { app_id }) => {

  const app = await knex('apps').where({
    app_id
  }).then(results => results[0])

  if(app) return app

  return await knex('apps').insert({
    app_id
  }).then(results => results[0])

}

const getReferer = async(knex, params) => {

  const referer = await knex('referers').where({
    url: params.url
  }).then(results => results[0])

  if(referer) return referer

  return await knex('referers').insert({
    url: params.url,
    urlscheme: params.urlscheme,
    urlhost: params.urlhost,
    urlport: params.urlport,
    urlpath: params.urlpath,
    urlquery: params.urlquery,
    urlfragment: params.urlfragment,
    medium: params.medium,
    source: params.source,
    term: params.term
  }).then(results => results[0])

}

const getLocation = async(knex, params) => {

  const location = await knex('locations').where({
    url: params.url
  }).then(results => results[0])

  if(location) return location

  return await knex('locations').insert({
    country: params.country,
    region: params.region,
    region_name: params.region_name,
    city: params.city,
    zipcode: params.zipcode,
    latitude: params.latitude,
    longitude: params.longitude,
    timezone: params.timezone
  }).then(results => results[0])

}

const getSession = async(knex, params) => {

  const app = await getApp(knex, {
    app_id: params.app_id
  })

  const session = await knex('sessions').where({
    user_id: params.user_id,
    app_id: app.id
  }).then(results => results[0])

  if(session) return session

  const referer = await getReferer(knex, {
    referer: params.referer
  })

  const location = await getLocation(knex, {
    location: params.location
  })

  return await knex('sessions').insert({
    user_id: params.user_id,
    app_id: app.id,
    referer_id: referer.id,
    location_id: location.id
  }).then(results => results[0])

}

const getEventType = async(knex, params) => {

  const event_type = await knex('event_types').where({
    type: params.type
  }).then(results => results[0])

  if(event_type) return event_type

  return await knex('event_types').insert({
    type: params.type
  }).then(results => results[0])

}

const getPage = async(knex, params) => {

  const page = await knex('pages').where({
    url: params.url
  }).then(results => results[0])

  if(page) return page

  return await knex('pages').insert({
    url: params.url,
    urlscheme: params.urlscheme,
    urlhost: params.urlhost,
    urlport: params.urlport,
    urlpath: params.urlpath,
    urlquery: params.urlquery,
    urlfragment: params.urlfragment
  }).then(results => results[0])

}

const createEvent = async(knex, params) => {

  const event_type = await getEventType(knex, {
    type: params.type
  }).then(results => results[0])

  const page = await getPage(knex, params.page).then(results => results[0])

  return await knex('events').insert({
    session_id: params.session_id,
    type: event_type.type,
    event_id: params.event_id,
    page_id: page.id,
    created_at: params.tstamp
  }).then(results => results[0])

}

const knex = new Knex({
  client: 'postgresql',
  connection: process.env.ANALYTICS_URL,
  useNullAsDefault: true,
  pool: {
    min: 5,
    max: 30
  }
})

const sanitize = (value) => {
  if(!value || value.length === 0) return null
  return value
}

const badevents = new nsq.Reader('BadEnrichedEvents', 'BadEnrichedEvents', {
  nsqdTCPAddresses: process.env.NSQD_URL
})

badevents.connect()

badevents.on('message', async msg => {

  const raw = msg.rawMessage.toString('hex').substr(52)

  const rawMessage = JSON.parse(Buffer.from(raw, 'hex').toString('utf8'))

  await knex('bad_events').insert({
    data: rawMessage.data.payload.enriched,
    errors: {
      messages: rawMessage.data.failure.messages.reduce((errors,error) => [
        ...errors,
        ...error.error ? [error.error] : [],
        ...error.expectation ? [error] : []
      ], [])
    }
  })

  msg.finish()
})

const goodevents = new nsq.Reader('EnrichedEvents', 'EnrichedEvents', {
  nsqdTCPAddresses: process.env.NSQD_URL
})

goodevents.connect()

goodevents.on('message', async msg => {

  const raw = msg.rawMessage.toString('hex').substr(52)

  const rawMessage = Buffer.from(raw, 'hex').toString('utf8')

  const message = rawMessage.split('\t')

  const data = keys.reduce((event, key, index) => ({
    ...event,
    [key]: sanitize(message[index])
  }), {})

  await knex('good_events').insert({ data })

  const user = await getUser(knex, {
    domain_userid: data.domain_userid,
    network_userid: data.network_userid,
    user_id: data.user_id
  })

  const session = await getSession(knex, {
    user_id: user.id,
    app_id: data.app_id,
    browser: {
      name: data.br_name,
      family: data.br_family,
      version: data.br_version,
      type: data.br_type,
      renderengine: data.br_renderengine,
      lang: data.br_lang,
      features_pdf: data.br_features_pdf,
      features_flash: data.br_features_flash,
      features_java: data.br_features_java,
      features_director: data.br_features_director,
      features_quicktime: data.br_features_quicktime,
      features_realplayer: data.br_features_realplayer,
      features_windowsmedia: data.br_features_windowsmedia,
      features_gears: data.br_features_gears,
      features_silverlight: data.br_features_silverlight,
      cookies: data.br_cookies,
      colordepth: data.br_colordepth,
      viewwidth: data.br_viewwidth,
      viewheight: data.br_viewheight
    },
    os: {
      name: data.os_name,
      family: data.os_family,
      manufacturer: data.os_manufacturer,
      timezone: data.os_timezone
    },
    device: {
      type: data.dvce_type,
      ismobile: data.dvce_ismobile,
      screenwidth: data.dvce_screenwidth,
      screenheight: data.dvce_screenheight
    },
    location: {
      country: data.geo_country,
      region: data.geo_region,
      region_name: data.geo_region_name,
      city: data.geo_city,
      zipcode: data.geo_zipcode,
      latitude: data.geo_latitude,
      longitude: data.geo_longitude,
      timezone: data.geo_timezone
    },
    ip: {
      isp: data.ip_isp,
      organization: data.ip_organization,
      domain: data.ip_domain,
      netspeed: data.ip_netspeed
    },
    referer: {
      url: data.page_referrer,
      urlscheme: data.refr_urlscheme,
      urlhost: data.refr_urlhost,
      urlport: data.refr_urlport,
      urlpath: data.refr_urlpath,
      urlquery: data.refr_urlquery,
      urlfragment: data.refr_urlfragment,
      medium: data.refr_medium,
      source: data.refr_source,
      term: data.refr_term
    }
  })

  await createEvent(knex, {
    session_id: session.id,
    event_id: data.event_id,
    type: data.event,
    tstamp: data.dvce_created_tstamp,
    page: {
      url: data.page_url,
      urlscheme: data.page_urlscheme,
      urlhost: data.page_urlhost,
      urlport: data.page_urlport,
      urlpath: data.page_urlpath,
      urlquery: data.page_urlquery,
      urlfragment: data.page_urlfragment
    }
  })

  msg.finish()

})
