import URL from 'url'
import qs from 'qs'

const getClickId = (args) => {
  if(args.gclid) {
    return {
      mkt_network: 'Google',
      mkt_clickid: args.gclid
    }
  } else if(args.msclkid) {
    return {
      mkt_network: 'Microsoft',
      mkt_clickid: args.gclid
    }
  } else if(args.dclid) {
    return {
      mkt_network: 'DoubleClick',
      mkt_clickid: args.dclid
    }
  } else if(args.fbclid) {
    return {
      mkt_network: 'Facebook',
      mkt_clickid: args.fbclid
    }
  }
  return {}
}

const campaignEnrichment = async(req, event) => {

  if(!event.page_url) return event

  const url = URL.parse(event.page_url)

  const args = qs.parse(url.search.substr(1))

  return {
    ...event,
    mkt_medium: args.utm_medium || args.medium,
    mkt_source: args.utm_source || args.source,
    mkt_term: args.utm_term || args.term,
    mkt_content: args.utm_content || args.content,
    mkt_campaign: args.utm_campaign || args.campaign,
    ...getClickId(args)
  }

}

export default campaignEnrichment
