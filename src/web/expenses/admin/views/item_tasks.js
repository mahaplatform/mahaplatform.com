import React from 'react'
import _ from 'lodash'
import Status from './items/status'

const itemTasks = (type, item, user, rights, context, Edit) => {

  const tasks = {
    items: [ ]
  }

  const is_owner_can_edit = user.id === item.user.id && _.includes(['incomplete','pending','submitted','rejected'], item.status)

  const is_approver_can_edit = _.includes(item.approver_ids, user.id) && _.includes(['incomplete','pending','submitted','rejected'], item.status)

  const is_manager = _.includes(rights, 'expenses:manage_configuration')

  const is_manager_can_edit = is_manager && item.status === 'approved'

  if(is_owner_can_edit || is_approver_can_edit || is_manager_can_edit) {

    const editParams = {
      projectEndpoint: `/api/admin/expenses/users/${item.user.id}/projects`,
      [type]: item
    }

    tasks.items.push({ label: `Edit ${_.capitalize(type)}`, modal: (props) => <Edit { ...editParams } /> })

  }

  if(is_manager) {

    const statusParams = {
      item_type: type,
      item_id: item.id
    }

    tasks.items.push({ label: 'Revert Status', modal: (props) => <Status { ...statusParams } /> })

  }

  const is_owner_can_delete = user.id === item.user.id && _.includes(['incomplete','pending','rejected'], item.status)

  if(is_owner_can_delete) {

    tasks.items.push({
      label: `Delete ${_.capitalize(type)}`,
      confirm: `Are you sure you want to delete this ${type}`,
      request: {
        method: 'DELETE',
        endpoint: `/api/admin/expenses/${type}s/${item.id}`,
        onSuccess: (result) => {
          context.flash.set('success', `Successfully deleted this ${type}`)
          context.router.goBack()
        },
        onFailure: (result) => context.flash.set('error', `Unable to delete this ${type}`)
      }
    })

  }

  return tasks.items.length > 0 ? tasks : null

}

export default itemTasks
