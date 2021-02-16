import { addToTopics, removeFromTopics } from '@apps/crm/services/topics'
import { getNext } from '../utils'

const topicStep = async (req, { config, contact, state, step }) => {

  const { action, topic_id } = step

  if(!topic_id) return {}

  const executor = action === 'add' ? addToTopics : removeFromTopics

  await executor(req, {
    contact,
    topic_ids: [topic_id]
  })

  return {
    action: {
      data: {
        action
      },
      topic_id
    },
    next: getNext(req, { config, state })
  }

}

export default topicStep
