import { enrollInWorkflows } from './workflows'
import _ from 'lodash'

export const addTotopics = async (req, { contact, topic_ids }) => {

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

export const removeFromtopics = async (req, { contact, topic_ids }) => {

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

export const updatetopics = async (req, params) => {

  const { contact, topic_ids } = params

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
    await addTotopics(req, {
      contact,
      add_ids
    })
  }

  const remove_ids = params.remove_ids || existing_ids.filter(id => {
    return !_.includes(topic_ids, id)
  })

  if(remove_ids.length > 0) {
    await removeFromtopics(req, {
      contact,
      remove_ids
    })
  }

}
