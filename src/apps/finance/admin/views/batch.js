import _ from 'lodash'
import pluralize from 'pluralize'

const batchTask = (context, selected, color, action, pastTense, allowed, endpoint) => ({
  text: `${_.upperFirst(action)} ${pluralize('item', selected.total, true)}`,
  color,
  confirm: `Are you sure you want to ${action} these ${pluralize('item', selected.total, true)}?`,
  request: {
    method: 'PATCH',
    endpoint,
    body: {
      filter: selected.filter
    },
    onFailure: (result) => context.flash.set('error', `Unable to ${action} these ${pluralize('item', selected.total, true)}`),
    onSuccess: (result) => context.flash.set('success', `You successfully ${pastTense} ${pluralize('item', selected.total, true)}`)
  }
})

export default batchTask
