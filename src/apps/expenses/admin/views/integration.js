import pluralize from 'pluralize'
import Export from './batches/new'
import React from 'react'

export const getIntegrationColumn = (integration) => {

  if(integration === 'accpac') {

    return [
      { label: 'G/L Acct', key: 'integration.idglacct', visible: false }
    ]

  }

  return []

}

export const getIntegrationExport = (integration) => {

  if(integration === 'accpac') {

    return [
      { label: 'G/L Acct', key: 'integration.idglacct' }
    ]

  }

  return []

}

export const getIntegrationTasks = (integration, context, props) => {

  if(integration === 'accpac') {

    return {
      text: `Export ${pluralize('item', props.selected.length, true)}`,
      color: 'violet',
      rights: ['expenses:manage_configuration'],
      handler: () => {
        if(props.selected.length === 0) return context.alert.open('Please select one or more items')
        const valid = props.selected.reduce((valid, record) => {
          return !valid ? false : record.status === 'reviewed'
        }, true)
        if(!valid) return context.alert.open('You can only export reviewed items')
        const ids = props.selected.reduce((ids, record) => ({
          ...ids,
          [`${record.type}_ids`]: [
            ...ids[`${record.type}_ids`] || [],
            record.item_id
          ]
        }), { })
        context.confirm.open(`Are you sure you want to export these ${props.selected.length} items?`, () => {
          context.modal.open(<Export ids={ ids } token={ props.token } />)
        })

      }
    }

  }

  return null

}

export const getIntegrationTask = (integration, team, context, type, id) => {

  if(integration === 'accpac') {

    const ids = {
      [`${type}_ids`]: [id]
    }

    return [
      {
        color: 'violet',
        text: 'Export',
        handler: () => {
          context.confirm.open(`Are you sure you want to export this ${type}?`, () => {
            context.modal.open(<Export ids={ ids } token={ team.token } />)
          })
        }
      }
    ]

  }

  return null

}
