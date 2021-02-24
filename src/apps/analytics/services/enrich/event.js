import atob from 'atob'

const events = {
  pv: 'page_view',
  pp: 'page_ping',
  tr: 'transaction',
  ti: 'transaction_item',
  se: 'struct',
  ue: 'unstruct'
}

const parseDimensions = (dim) => {
  const parts = dim ? dim.split('x') : [null,null]
  return {
    width: parts[0],
    height: parts[1]
  }
}

const getUnstructEvent = (data) => {
  if(data.ue_pr) return data.ue_pr
  if(!data.ue_px) return null
  return JSON.parse(atob(data.ue_px))
}

const getContexts = (data) => {
  if(!data.cx) return null
  return JSON.parse(atob(data.cx))
}

const parseEvent = (req, { data }) => {

  const doc = parseDimensions(data.ds)

  const device = parseDimensions(data.res)

  const viewport = parseDimensions(data.vp)

  return {
    app_id: data.aid,
    platform: data.p,
    dvce_created_tstamp: data.dtm,
    event: events[data.e],
    event_id: data.eid,
    txn_id: data.transaction_id,
    name_tracker: data.tna,
    v_tracker: data.tv,
    v_collector: '1.0.0',
    v_etl: '1.0.0',
    user_id: data.uid,
    user_ipaddress: data.ip,
    user_fingerprint: data.fp,
    domain_userid: data.duid,
    domain_sessionidx: data.vid,
    network_userid: data.nuid,
    page_url: data.url,
    page_title: data.page,
    page_referrer: data.refr,
    contexts: getContexts(data),
    se_category: data.se_ca,
    se_action: data.se_ac,
    se_label: data.se_la,
    se_property: data.se_pr,
    se_value: data.se_va,
    unstruct_event: getUnstructEvent(data),
    pp_xoffset_min: data.pp_mix,
    pp_xoffset_max: data.pp_max,
    pp_yoffset_min: data.pp_miy,
    pp_yoffset_max: data.pp_may,
    useragent: data.ua,
    br_lang: data.lang,
    br_features_pdf: data.f_pdf,
    br_features_flash: data.f_fla,
    br_features_java: data.f_java,
    br_features_director: data.f_dir,
    br_features_quicktime: data.f_qt,
    br_features_realplayer: data.f_realp,
    br_features_windowsmedia: data.f_wma,
    br_features_gears: data.f_gears,
    br_features_silverlight: data.f_ag,
    br_cookies: data.cookie,
    br_colordepth: data.cd,
    br_viewwidth: viewport.width,
    br_viewheight: viewport.height,
    os_timezone: data.tz,
    dvce_screenwidth: device.width,
    dvce_screenheight: device.height,
    doc_charset: data.cs,
    doc_width: doc.width,
    doc_height: doc.height,
    base_currency: null,
    geo_timezone: null,
    etl_tags: null,
    dvce_sent_tstamp: data.stm,
    refr_domain_userid: null,
    refr_dvce_tstamp: null,
    derived_contexts: null,
    domain_sessionid: data.sid,
    derived_tstamp: null,
    event_vendor: null,
    event_name: null,
    event_format: null,
    event_version: null,
    event_fingerprint: null,
    true_tstamp: null
  }

}

export default parseEvent
