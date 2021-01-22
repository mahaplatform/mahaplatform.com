import Platform from '@apps/analytics/models/platform'
import Campaign from '@apps/analytics/models/campaign'
import Session from '@apps/analytics/models/session'
import Content from '@apps/analytics/models/content'
import Network from '@apps/analytics/models/network'
import Source from '@apps/analytics/models/source'
import Medium from '@apps/analytics/models/medium'
import Term from '@apps/analytics/models/term'
import App from '@apps/analytics/models/app'
import { getIPAddress } from './ipaddresses'
import { getUseragent } from './useragents'
import { getReferer } from './referers'
import _ from 'lodash'

const fetchOrCreate = async(req, { data, domain_user }) => {

  const platform = await Platform.fetchOrCreate({
    text: data.platform
  }, {
    transacting: req.analytics
  })

  const app = await App.fetchOrCreate({
    title: data.app_id,
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

  const useragent = await getUseragent(req, { data })

  const referer = data.page_referrer ? await getReferer(req, {
    data
  }) : null

  const ipaddress = await getIPAddress(req, {
    data
  })

  const source = data.mkt_source ? await Source.fetchOrCreate({
    text: data.mkt_source
  },{
    transacting: req.analytics
  }) : null

  const medium = data.mkt_medium ? await Medium.fetchOrCreate({
    text: data.mkt_source
  },{
    transacting: req.analytics
  }) : null

  const campaign = data.mkt_campaign ? await Campaign.fetchOrCreate({
    text: data.mkt_campaign
  },{
    transacting: req.analytics
  }) : null

  const term = data.mkt_term ? await Term.fetchOrCreate({
    text: data.mkt_term
  },{
    transacting: req.analytics
  }) : null

  const content = data.mkt_content ? await Content.fetchOrCreate({
    text: data.mkt_content
  },{
    transacting: req.analytics
  }) : null

  const network = data.mkt_network ? await Network.fetchOrCreate({
    text: data.mkt_network
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
    clickid: data.mkt_clickid,
    domain_sessionid: data.domain_sessionid
  }).save(null, {
    transacting: req.analytics
  })

}

export const getSession = async(req, { data, event_type, domain_user, page_url }) => {

  const session = await fetchOrCreate(req, { data, domain_user })

  const params = {}

  if(page_url.qsargs) {
    if(page_url.qsargs.ecid) params.email_campaign_id = page_url.qsargs.ecid
    if(page_url.qsargs.eid) params.email_id = page_url.qsargs.eid
  }

  if(event_type.get('type') === 'track_maha') {
    const { key, value } = data.unstruct_event.data.data
    if(_.includes(['form_id','response_id','event_id','registration_id','store_id','order_id','website_id'], key)) {
      params[key] = value
    }
  }

  if(Object.keys(params).length > 0) {
    await session.save(params, {
      transacting: req.analytics,
      patch: true
    })
  }

  return session

}
