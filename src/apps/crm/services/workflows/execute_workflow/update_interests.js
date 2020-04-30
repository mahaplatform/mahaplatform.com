import { addToTopics, removeFromTopics } from '../../topics'
import _ from 'lodash'

const updateTopics = async (req, { contact, config, enrollment }) => {

  const { action, topic_id } = config

  if(!topic_id) return {}

  await enrollment.load(['topics'], {
    transacting: req.trx
  })

  const existing_ids = contact.related('topics').map(topic => {
    return topic.get('id')
  })

  if(action === 'add' && _.includes(existing_ids, topic_id)) return {}

  if(action === 'remove' && !_.includes(existing_ids, topic_id)) return {}

  if(action === 'add') {
    await addToTopics(req, {
      contact,
      topic_ids: [topic_id]
    })
  }

  if(action === 'remove') {
    await removeFromTopics(req, {
      contact,
      topic_ids: [topic_id]
    })
  }

  return {}

}

export default updateTopics
