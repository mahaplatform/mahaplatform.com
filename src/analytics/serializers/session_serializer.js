const sessionSerializer = (req, result) => ({
  id: result.get('session_id'),
  domain_userid: result.get('domain_userid'),
  contact_id: result.get('contact_id'),
  app: result.get('app'),
  platform: result.get('platform'),
  referer: result.get('referer'),
  city: result.get('city'),
  region: result.get('region'),
  country: result.get('country'),
  postal_code: result.get('postal_code'),
  metro_code: result.get('metro_code'),
  latitude: result.get('latitude'),
  longitude: result.get('longitude'),
  ipaddress: result.get('ipaddress'),
  source: result.get('source'),
  medium: result.get('medium'),
  campaign: result.get('campaign'),
  term: result.get('term'),
  content: result.get('content'),
  network: result.get('network'),
  device: result.get('device'),
  manufacturer: result.get('manufacturer'),
  os: result.get('os'),
  os_version: result.get('os_version'),
  browser: result.get('browser'),
  browser_version: result.get('browser_version'),
  useragent: result.get('useragent'),
  clickid: result.get('clickid'),
  response_id: result.get('response_id'),
  registration_id: result.get('registration_id'),
  order_id: result.get('order_id'),
  pageviews_count: result.get('pageviews_count'),
  duration: result.get('duration'),
  first_page_id: result.get('first_page_id'),
  last_page_id: result.get('last_page_id'),
  started_at: result.get('started_at'),
  ended_at: result.get('ended_at'),
  events: result.get('events') ? result.get('events').map(event) : null
})

const event = (event) => {
  if(!event) return null
  return {
    id: event.get('id'),
    type: event.get('type'),
    page: event.get('page_id') ? {
      title: event.get('page_title'),
      url: event.get('page_url')
    } : null,
    duration: event.get('duration'),
    scrolldepth: event.get('scrolldepth'),
    data: event.get('data'),
    tstamp: event.get('tstamp')
  }

}

export default sessionSerializer
