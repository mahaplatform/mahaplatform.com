import Export from './batches/new'
import pluralize from 'pluralize'
import React from 'react'

export const getIntegrationTasks = (integration, context, selected, onSuccess) => ({
  text: `Export ${pluralize('item', selected.total, true)}`,
  color: 'violet',
  rights: ['finance:manage_configuration'],
  confirm: `Are you sure you want to export these ${selected.total} items?`,
  modal: <Export integration={ integration } type="expense" filter={ selected.filter } onSuccess={ onSuccess } />
})

export const getIntegrationTask = (integration, team, context, type, code, onSuccess) => [
  {
    color: 'violet',
    text: 'Export',
    confirm: `Are you sure you want to export this ${type}?`,
    modal: <Export integration={ integration } type="expense" filter={{ $and: [{code: { $eq: code }}] }} onSuccess={ onSuccess }  />
  }
]
