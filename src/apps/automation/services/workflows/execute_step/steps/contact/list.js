import { addToLists, removeFromLists } from '@apps/crm/services/lists'
import { getNext } from '../utils'

const listStep = async (req, { config, contact, state, step }) => {

  const { action, list_id } = step.config

  if(!list_id) return {}

  const executor = action === 'add' ? addToLists : removeFromLists

  await executor(req, {
    contact,
    list_ids: [list_id]
  })

  return {
    action: {
      data: {
        action
      },
      list_id
    },
    next: getNext(req, { config, state })
  }

}

export default listStep
