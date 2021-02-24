import { getIPAddress } from './ipaddresses'
import { getUseragent } from './useragents'
import Platform from '@apps/analytics/models/platform'
import Campaign from '@apps/analytics/models/campaign'
import Session from '@apps/analytics/models/session'
import Content from '@apps/analytics/models/content'
import Network from '@apps/analytics/models/network'
import Source from '@apps/analytics/models/source'
import Medium from '@apps/analytics/models/medium'
import { getReferer } from './referers'
import Term from '@apps/analytics/models/term'
import App from '@apps/analytics/models/app'
import _ from 'lodash'
import URL from 'url'
import qs from 'qs'

const fetchOrCreate = async(req, { domain_user, enriched }) => {

  const platform = await Platform.fetchOrCreate({
    text: enriched.platform
  }, {
    transacting: req.analytics
  })

  const app = await App.fetchOrCreate({
    title: enriched.app_id,
    platform_id: platform.get('id')
  }, {
    transacting: req.analytics
  })

  const session = await Session.query(qb => {
    qb.where('domain_user_id', domain_user.get('id'))
    qb.where('app_id', app.get('id'))
  }).fetch({
    transacting: req.analytics
  })

  if(session) return session

  const useragent = await getUseragent(req, {
    enriched
  })

  const referer = enriched.page_referrer ? await getReferer(req, {
    enriched
  }) : null

  const ipaddress = await getIPAddress(req, {
    enriched
  })

  const source = enriched.mkt_source ? await Source.fetchOrCreate({
    text: enriched.mkt_source
  },{
    transacting: req.analytics
  }) : null

  const medium = enriched.mkt_medium ? await Medium.fetchOrCreate({
    text: enriched.mkt_source
  },{
    transacting: req.analytics
  }) : null

  const campaign = enriched.mkt_campaign ? await Campaign.fetchOrCreate({
    text: enriched.mkt_campaign
  },{
    transacting: req.analytics
  }) : null

  const term = enriched.mkt_term ? await Term.fetchOrCreate({
    text: enriched.mkt_term
  },{
    transacting: req.analytics
  }) : null

  const content = enriched.mkt_content ? await Content.fetchOrCreate({
    text: enriched.mkt_content
  },{
    transacting: req.analytics
  }) : null

  const network = enriched.mkt_network ? await Network.fetchOrCreate({
    text: enriched.mkt_network
  },{
    transacting: req.analytics
  }) : null

  return await Session.forge({
    domain_user_id: domain_user.get('id'),
    app_id: app.get('id'),
    ipaddress_id: ipaddress.get('id'),
    useragent_id: useragent.get('id'),
    referer_id: referer ? referer.get('id') : null,
    source_id: source ? source.get('id') : null,
    medium_id: medium ? medium.get('id') : null,
    campaign_id: campaign ? campaign.get('id') : null,
    term_id: term ? term.get('id') : null,
    content_id: content ? content.get('id') : null,
    network_id: network ? network.get('id') : null,
    clickid: enriched.mkt_clickid,
    domain_sessionid: enriched.domain_sessionid
  }).save(null, {
    transacting: req.analytics
  })

}

const getParams = (req, { enriched, event_type }) => {

  const url = enriched.page_url ? URL.parse(enriched.page_url) : {}

  const qsargs = url.search ? qs.parse(url.search.substr(1)) : {}

  const params = {}

  if(qsargs.ecid) params.email_campaign_id = qsargs.ecid

  if(qsargs.eid) params.email_id = qsargs.eid

  if(event_type.get('type') === 'track_maha' && enriched.unstruct_event) {
    const { key, value } = enriched.unstruct_event.data.data
    if(_.includes(['form_id','response_id','event_id','registration_id','store_id','order_id','website_id'], key)) {
      params[key] = value
    }
  }

  return params

}

export const getSession = async(req, { enriched, event_type, domain_user }) => {

  const session = await fetchOrCreate(req, {
    domain_user,
    enriched
  })

  const params = getParams(req, {
    enriched,
    event_type
  })

  if(Object.keys(params).length > 0) {
    await session.save(params, {
      transacting: req.analytics,
      patch: true
    })
  }

  return session

}
