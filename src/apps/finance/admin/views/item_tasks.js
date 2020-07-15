import Status from './items/status'
import React from 'react'
import _ from 'lodash'

const itemTasks = (type, item, user, rights, context, Edit) => {

  const tasks = {
    items: [ ]
  }

  console.log(type, item, user, rights, context, Edit)

  const is_owner = user.id === item.user.id

  const is_approver = _.includes(item.approver_ids, user.id)

  const is_manager = _.includes(rights, 'finance:manage_configuration')

  const is_owner_can_edit = is_owner && _.includes(['incomplete','pending','rejected'], item.status)

  const is_approver_can_edit =  is_approver && _.includes(['incomplete','pending','submitted','rejected'], item.status)

  const is_manager_can_edit = is_manager && _.includes(['incomplete','pending','submitted','approved','rejected'], item.status)

  if(is_owner_can_edit || is_approver_can_edit || is_manager_can_edit) {

    const editParams = {
      projectEndpoint: `/api/admin/finance/users/${item.user.id}/projects`,
      [type]: item
    }

    tasks.items.push({ label: `Edit ${_.capitalize(type)}`, modal: (props) => <Edit { ...editParams } /> })

  }

  if(is_manager) {

    const statusParams = {
      item_type: type,
      item_id: item.id
    }

    tasks.items.push({ label: 'Change Status', modal: (props) => <Status { ...statusParams } /> })

  }

  const can_delete = !_.includes(['reviewed','exported'], item.status)

  if((is_owner || is_approver || is_manager) && can_delete) {

    tasks.items.push({
      label: `Delete ${_.capitalize(type)}`,
      confirm: `Are you sure you want to delete this ${type}`,
      request: {
        method: 'DELETE',
        endpoint: `/api/admin/finance/${type}s/${item.id}`,
        onSuccess: (result) => {
          context.flash.set('success', `Successfully deleted this ${type}`)
          context.router.history.goBack()
        },
        onFailure: (result) => context.flash.set('error', `Unable to delete this ${type}`)
      }
    })

  }

  return tasks.items.length > 0 ? tasks : null

}

export default itemTasks
