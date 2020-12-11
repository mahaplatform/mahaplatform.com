import Export from './batches/new'
import pluralize from 'pluralize'
import React from 'react'

export const getIntegrationTasks = (integration, context, selected, onSuccess) => {

  if(integration === 'accpac') {
    return {
      text: `Export ${pluralize('item', selected.total, true)}`,
      color: 'violet',
      rights: ['finance:manage_configuration'],
      confirm: `Are you sure you want to export these ${selected.total} items?`,
      modal: <Export type="expense" filter={ selected.filter } onSuccess={ onSuccess } />
    }
  }

  return null

}

export const getIntegrationTask = (integration, team, context, type, code) => {

  if(integration === 'accpac') {
    return [{
      color: 'violet',
      text: 'Export',
      confirm: `Are you sure you want to export this ${type}?`,
      modal: <Export type="expense" filter={{ $and: [{code: { $eq: code }}] }} onSuccess={ onSuccess }  />
    }]
  }

  return null

}
