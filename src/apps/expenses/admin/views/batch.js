import _ from 'lodash'
import pluralize from 'pluralize'

const batchTask = (context, props, color, action, pastTense, allowed, endpoint) => ({
  text: `${_.upperFirst(action)} ${pluralize('item', props.selected.length, true)}`,
  color,
  handler: () => {
    if(props.selected.length === 0) return context.alert.open('Please select one or more items')
    const valid = props.selected.reduce((valid, record) => {
      return !valid ? false : record.status === allowed
    }, true)
    if(!valid) return context.alert.open(`You can only ${action} ${allowed} items`)
    context.confirm.open(`Are you sure you want to ${action} these ${pluralize('item', props.selected.length, true)}?`, () => {
      context.network.request({
        method: 'PATCH',
        endpoint,
        body: props.selected.reduce((ids, record) => ({
          ...ids,
          [`${record.type}_ids`]: [
            ...ids[`${record.type}_ids`] || [],
            record.item_id
          ]
        }), { }),
        onFailure: (result) => context.flash.set('error', `Unable to ${action} these ${pluralize('item', props.selected.length, true)}`),
        onSuccess: (result) => context.flash.set('success', `You successfully ${pastTense} ${pluralize('item', props.selected.length, true)}`)
      })
    })
  }
})

export default batchTask
