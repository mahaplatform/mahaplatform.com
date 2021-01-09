import EventType from '@apps/analytics/models/event_type'
import Property from '@apps/analytics/models/property'
import Category from '@apps/analytics/models/category'
import Action from '@apps/analytics/models/action'
import Event from '@apps/analytics/models/event'
import Label from '@apps/analytics/models/label'
import { getPage } from './pages'

export const createEvent = async(req, { data, session }) => {

  const event_type = await EventType.fetchOrCreate({
    type: data.event
  }, {
    transacting: req.trx
  })

  const page = data.page_url ? await getPage(req, {
    title: data.page_title,
    url: data.page_url
  }) : null

  console.log('next')

  const action = data.se_action ? await Action.fetchOrCreate({
    text: data.se_action
  }, {
    transacting: req.trx
  }) : null

  const category = data.se_category ? await Category.fetchOrCreate({
    text: data.se_category
  }, {
    transacting: req.trx
  }) : null

  const label = data.se_label ? await Label.fetchOrCreate({
    text: data.se_label
  }, {
    transacting: req.trx
  }) : null

  const property = data.se_property ? await Property.fetchOrCreate({
    text: data.se_property
  }, {
    transacting: req.trx
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
    tstamp: data.dvce_created_tstamp
  }).save(null, {
    transacting: req.trx
  })

}
