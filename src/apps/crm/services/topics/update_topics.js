import removeFromTopics from './remove_from_topics'
import addToTopics from './add_to_topics'
import _ from 'lodash'

const updateTopics = async (req, params) => {

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

export default updateTopics
