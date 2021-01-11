import EventType from '@apps/analytics/models/event_type'
import Property from '@apps/analytics/models/property'
import Category from '@apps/analytics/models/category'
import Country from '@apps/analytics/models/country'
import Action from '@apps/analytics/models/action'
import Region from '@apps/analytics/models/region'
import Event from '@apps/analytics/models/event'
import Label from '@apps/analytics/models/label'
import City from '@apps/analytics/models/city'
import { getPage } from './pages'

export const createEvent = async(req, { data, session }) => {

  const event = await Event.query(qb => {
    qb.where('event_id', data.event_id)
  }).fetch({
    transacting: req.analytics
  })

  if(event) return event

  const event_type = await EventType.fetchOrCreate({
    type: data.event
  }, {
    transacting: req.analytics
  })

  const page = data.page_url ? await getPage(req, {
    title: data.page_title,
    url: data.page_url
  }) : null

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

  const ti_category = data.ti_category ? await Category.fetchOrCreate({
    text: data.ti_category
  }, {
    transacting: req.analytics
  }) : null

  return await Event.forge({
    session_id: session.get('id'),
    event_type_id: event_type.get('id'),
    page_id: page ? page.get('id') : null,
    action_id: action ? action.get('id') : null,
    category_id: category ? category.get('id') : null,
    label_id: label ? label.get('id') : null,
    property_id: property ? property.get('id') : null,
    event_id: data.event_id,
    target: data.target,
    value: data.value,
    tr_orderid: data.tr_orderid,
    tr_affiliation: data.tr_affiliation,
    tr_total: data.tr_total,
    tr_shipping: data.tr_shipping,
    tr_tax: data.tr_tax,
    tr_city_id: tr_city ? tr_city.get('id') : null,
    tr_state_id: tr_state ? tr_state.get('id') : null,
    tr_country_id: tr_country ? tr_country.get('id') : null,
    ti_orderid: data.ti_orderid,
    ti_sku: data.ti_sku,
    ti_name: data.ti_name,
    ti_category_id: ti_category ? ti_category.get('id') : null,
    ti_price: data.ti_price,
    ti_quantity: data.ti_quantity,
    pp_xoffset_min: data.pp_xoffset_min,
    pp_xoffset_max: data.pp_xoffset_max,
    pp_yoffset_min: data.pp_yoffset_min,
    pp_yoffset_max: data.pp_yoffset_max,
    tstamp: data.dvce_created_tstamp
  }).save(null, {
    transacting: req.analytics
  })

}
