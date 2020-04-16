import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ template }) => ({
  items: [
    { label: 'Details', component: <Details template={ template } /> }
  ]
})

const getTasks = ({ template }) => {
  const items = []
  if(!template.deleted_at) {
    items.push({
      label: 'Delete Template',
      confirm: 'Are you sure you want to delete this template?',
      request: {
        endpoint: `/api/admin/crm/programs/${template.program.id}/templates/${template.id}`,
        method: 'delete'
      }
    })
  }
  return { items }
}

const mapResourcesToPage = (props, context) => ({
  template: `/api/admin/crm/programs/${props.params.program_id}/templates/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Template',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
