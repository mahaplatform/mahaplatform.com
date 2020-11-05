import { addToTopics, removeFromTopics } from '@apps/crm/services/topics'
import _ from 'lodash'

const topicStep = async (req, { contact, config, enrollment }) => {

  const { action, topic_id } = config

  if(!topic_id) return {}

  await contact.load(['topics'], {
    transacting: req.trx
  })

  const existing_ids = contact.related('topics').map(topic => {
    return topic.get('id')
  })

  if(action === 'add' && _.includes(existing_ids, topic_id)) {
    return {
      action: {
        topic_id
      }
    }
  }

  if(action === 'remove' && !_.includes(existing_ids, topic_id)) {
    return {
      action: {
        topic_id
      }
    }
  }

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

  return {
    action: {
      topic_id
    }
  }

}

export default topicStep
