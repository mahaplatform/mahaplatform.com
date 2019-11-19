import { getIntegrationTask } from './integration'
import _ from 'lodash'

const itemButtons = (settings, type, item, team, user, rights, context) => {

  if(item.status === 'pending' && user.id === item.user.id) {

    return [
      {
        color: 'red',
        text: 'Submit for Approval',
        disabled: item.status === 'incomplete',
        request: {
          endpoint: `/api/admin/finance/${type}s/${item.id}/submit`,
          method: 'patch'
        }
      }
    ]

  } else if(item.status === 'submitted' && _.includes(item.approver_ids, user.id) && item.user.id !== user.id) {

    return [
      {
        color: 'red',
        text: 'Reject',
        request: {
          endpoint: `/api/admin/finance/${type}s/${item.id}/reject`,
          method: 'patch'
        }
      },{
        color: 'green',
        text: 'Approve',
        request: {
          endpoint: `/api/admin/finance/${type}s/${item.id}/approve`,
          method: 'patch'
        }
      }
    ]

  } else if(item.status === 'approved' && _.includes(rights, 'finance:manage_configuration')) {

    return [
      {
        color: 'red',
        text: 'Reject',
        request: {
          endpoint: `/api/admin/finance/${type}s/${item.id}/reject`,
          method: 'patch'
        }
      },{
        color: 'pink',
        text: 'Review',
        request: {
          endpoint: `/api/admin/finance/${type}s/${item.id}/review`,
          method: 'patch'
        }
      }
    ]

  } else if(item.status === 'reviewed' && _.includes(rights, 'finance:manage_configuration')) {

    return getIntegrationTask(settings.integration, team, context, type, item.id)

  }

  return null

}

export default itemButtons
