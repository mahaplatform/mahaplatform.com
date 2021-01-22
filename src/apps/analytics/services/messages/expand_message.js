import _ from 'lodash'

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

const sanitize = (value) => {
  if(!value || value.length === 0) return null
  return value
}

export const expandMessage = (message) => {

  const fields = message.split('\t')

  const data = keys.reduce((event, key, index) => ({
    ...event,
    [key]: sanitize(fields[index])
  }), {})

  data.contexts = JSON.parse(data.contexts)

  data.unstruct_event = JSON.parse(data.unstruct_event)

  data.context_id = _.get(data, 'contexts.data[0].data.id') || null

  return data

}
