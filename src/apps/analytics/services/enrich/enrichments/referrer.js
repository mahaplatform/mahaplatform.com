import URL from 'url'
import qs from 'qs'

const referrerEnrichment = async(req, event) => {

  if(!event.page_referrer) return event

  const url = URL.parse(event.page_referrer)

  const args = qs.parse(url.search.substr(1))

  return {
    ...event,
    refr_urlscheme: url.protocol.slice(0, -1),
    refr_urlhost: url.hostname,
    refr_urlport: url.port,
    refr_urlpath: url.pathname,
    refr_urlquery: url.search ? url.search.substr(1) : null,
    refr_urlfragment: url.hash ? url.hash.substr(1) : null,
    refr_medium: args.utm_medium || args.medium,
    refr_source: args.utm_source || args.source,
    refr_term: args.utm_term || args.term
  }

}

export default referrerEnrichment
