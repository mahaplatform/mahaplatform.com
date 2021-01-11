import EventType from '@apps/analytics/models/event_type'
import Property from '@apps/analytics/models/property'
import Category from '@apps/analytics/models/category'
import Country from '@apps/analytics/models/country'
import Network from '@apps/analytics/models/network'
import Action from '@apps/analytics/models/action'
import Region from '@apps/analytics/models/region'
import Event from '@apps/analytics/models/event'
import Label from '@apps/analytics/models/label'
import City from '@apps/analytics/models/city'
import { getEventType } from './event_types'
import { getPage } from './pages'

export const createEvent = async(req, { data, session }) => {

  const event = await Event.query(qb => {
    qb.where('event_id', data.event_id)
  }).fetch({
    transacting: req.analytics
  })

  if(event) return event

  const event_type = await getEventType(req, { data })

  const page = data.page_url ? await getPage(req, {
    title: data.page_title,
    url: data.page_url
  }) : null

  const eventdata = {
    session_id: session.get('id'),
    event_type_id: event_type.get('id'),
    page_id: page ? page.get('id') : null,
    event_id: data.event_id,
    tstamp: data.dvce_created_tstamp
  }

  if(event_type.get('type') === 'page_ping') {
    eventdata.pp_xoffset_min = data.pp_xoffset_min
    eventdata.pp_xoffset_max = data.pp_xoffset_max
    eventdata.pp_yoffset_min = data.pp_yoffset_min
    eventdata.pp_yoffset_max = data.pp_yoffset_max
  }

  if(event_type.get('type') === 'transaction_item') {

    const ti_category = data.ti_category ? await Category.fetchOrCreate({
      text: data.ti_category
    }, {
      transacting: req.analytics
    }) : null

    eventdata.ti_orderid = data.ti_orderid
    eventdata.ti_sku = data.ti_sku
    eventdata.ti_name = data.ti_name
    eventdata.ti_category_id = ti_category ? ti_category.get('id') : null
    eventdata.ti_price = data.ti_price
    eventdata.ti_quantity = data.ti_quantity

  }

  if(event_type.get('type') === 'transaction') {

    const tr_city = data.tr_city ? await City.fetchOrCreate({
      text: data.tr_city
    }, {
      transacting: req.analytics
    }) : null

    const tr_state = data.tr_state ? await Region.fetchOrCreate({
      text: data.tr_state_id
    }, {
      transacting: req.analytics
    }) : null

    const tr_country = data.tr_country ? await Country.fetchOrCreate({
      text: data.tr_country
    }, {
      transacting: req.analytics
    }) : null

    eventdata.tr_orderid = data.tr_orderid
    eventdata.tr_affiliation = data.tr_affiliation
    eventdata.tr_total = data.tr_total
    eventdata.tr_shipping = data.tr_shipping
    eventdata.tr_tax = data.tr_tax
    eventdata.tr_city_id = tr_city ? tr_city.get('id') : null
    eventdata.tr_state_id = tr_state ? tr_state.get('id') : null
    eventdata.tr_country_id = tr_country ? tr_country.get('id') : null

  }

  if(event_type.get('type') === 'struct') {

    const action = data.se_action ? await Action.fetchOrCreate({
      text: data.se_action
    }, {
      transacting: req.analytics
    }) : null

    const category = data.se_category ? await Category.fetchOrCreate({
      text: data.se_category
    }, {
      transacting: req.analytics
    }) : null

    const label = data.se_label ? await Label.fetchOrCreate({
      text: data.se_label
    }, {
      transacting: req.analytics
    }) : null

    const property = data.se_property ? await Property.fetchOrCreate({
      text: data.se_property
    }, {
      transacting: req.analytics
    }) : null

    eventdata.action_id = action ? action.get('id') : null
    eventdata.category_id = category ? category.get('id') : null
    eventdata.label_id = label ? label.get('id') : null
    eventdata.property_id = property ? property.get('id') : null
    eventdata.value = data.value

  }

  if(event_type.get('type') === 'social_interaction') {

    const si = data.unstruct_event.data.data

    const action = si.action ? await Action.fetchOrCreate({
      text: si.action
    }, {
      transacting: req.analytics
    }) : null

    const network = si.network ? await Network.fetchOrCreate({
      text: si.network
    }, {
      transacting: req.analytics
    }) : null


    eventdata.action_id = action ? action.get('id') : null
    eventdata.network_id = network ? network.get('id') : null
    eventdata.target = si.target

  }

  return await Event.forge(eventdata).save(null, {
    transacting: req.analytics
  })

}
