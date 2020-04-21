import { enrollInWorkflows } from './workflows'
import _ from 'lodash'

export const addToTopics = async (req, { contact, topic_ids }) => {

  await Promise.mapSeries(topic_ids, async (topic_id) => {

    await req.trx('crm_interests').insert({
      contact_id: contact.get('id'),
      topic_id
    })

    await enrollInWorkflows(req, {
      trigger_type: 'topic',
      action: 'add',
      topic_id
    })

  })

}

export const removeFromTopics = async (req, { contact, topic_ids }) => {

  await Promise.mapSeries(topic_ids, async(topic_id) => {

    await req.trx('crm_interests').where({
      contact_id: contact.get('id'),
      topic_id
    }).delete()

    await enrollInWorkflows(req, {
      trigger_type: 'topic',
      action: 'remove',
      topic_id
    })

  })
}

export const updateTopics = async (req, params) => {

  const { contact, removing } = params

  const topic_ids = params.topic_ids || []

  await contact.load('topics', {
    transacting: req.trx
  })

  const existing_ids = contact.related('topics').toArray().map(item => {
    return item.id
  })

  const add_ids = params.add_ids || topic_ids.filter(id => {
    return !_.includes(existing_ids, id)
  })

  if(add_ids.length > 0) {
    await addToTopics(req, {
      topic_ids: add_ids,
      contact
    })
  }

  const remove_ids = removing !== false ? params.remove_ids || existing_ids.filter(id => {
    return !_.includes(topic_ids, id)
  }) : []

  if(remove_ids.length > 0) {
    await removeFromTopics(req, {
      topic_ids: remove_ids,
      contact
    })
  }

}
