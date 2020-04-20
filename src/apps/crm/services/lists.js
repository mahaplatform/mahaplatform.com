import { enrollInWorkflows } from './workflows'
import _ from 'lodash'

export const addToLists = async (req, { contact, list_ids }) => {

  await Promise.mapSeries(list_ids, async (list_id) => {

    await req.trx('crm_subscriptions').insert({
      contact_id: contact.get('id'),
      list_id
    })

    await enrollInWorkflows(req, {
      trigger_type: 'list',
      action: 'add',
      list_id
    })

  })

}

export const removeFromLists = async (req, { contact, list_ids }) => {

  await Promise.mapSeries(list_ids, async(list_id) => {

    await req.trx('crm_subscriptions').where({
      contact_id: contact.get('id'),
      list_id
    }).delete()

    await enrollInWorkflows(req, {
      trigger_type: 'list',
      action: 'remove',
      list_id
    })

  })
}

export const updateLists = async (req, params) => {

  const { contact, removing } = params

  const list_ids = params.list_ids || []

  await contact.load('lists', {
    transacting: req.trx
  })

  const existing_ids = contact.related('lists').toArray().map(item => {
    return item.id
  })

  const add_ids = params.add_ids || list_ids.filter(id => {
    return !_.includes(existing_ids, id)
  })

  if(add_ids.length > 0) {
    await addToLists(req, {
      list_ids: add_ids,
      contact
    })
  }

  const remove_ids = removing !== false ? params.remove_ids || existing_ids.filter(id => {
    return !_.includes(list_ids, id)
  }) : []

  if(remove_ids.length > 0) {
    await removeFromLists(req, {
      list_ids: remove_ids,
      contact
    })
  }

}
