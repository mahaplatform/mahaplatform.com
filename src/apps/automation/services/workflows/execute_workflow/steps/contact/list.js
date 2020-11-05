import { addToLists, removeFromLists } from '@apps/crm/services/lists'
import _ from 'lodash'

const listStep = async (req, { contact, config, enrollment }) => {

  const { action, list_id } = config

  if(!list_id) return {}

  await contact.load(['lists'], {
    transacting: req.trx
  })

  const existing_ids = contact.related('lists').map(list => {
    return list.get('id')
  })

  if(action === 'add' && _.includes(existing_ids, list_id)) {
    return {
      action: {
        list_id
      }
    }
  }

  if(action === 'remove' && !_.includes(existing_ids, list_id)) {
    return {
      action: {
        list_id
      }
    }
  }

  if(action === 'add') {
    await addToLists(req, {
      contact,
      list_ids: [list_id]
    })
  }

  if(action === 'remove') {
    await removeFromLists(req, {
      contact,
      list_ids: [list_id]
    })
  }

  return {
    action: {
      list_id
    }
  }

}

export default listStep
