import Workflows from './workflows'
import Workflow from './workflow'
import Details from './details'
import { Page } from '@admin'
import React from 'react'
import Edit from './edit'

const getTabs = ({ audits, topic, workflows }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } topic={ topic } /> },
    { label: 'Automation', component: <Workflows topic={ topic }workflows={ workflows }/> }
  ]
})

const getTasks = ({ topic, program }, { flash, router }) => ({
  items: program.access_type === 'manage' ? [
    { label: 'Edit Topic', show: !topic.deleted_at, modal: <Edit topic={ topic } /> },
    { label: 'Create Workflow', show: !topic.deleted_at, modal: <Workflow topic={ topic } /> },
    {
      label: 'Delete Topic',
      show: !topic.deleted_at,
      confirm: `
        Are you sure you want to delete this topic? You will also remove all of
        the contacts and delete any associated workflow, emails, and performance
        data
      `,
      request: {
        endpoint: `/api/admin/crm/programs/${topic.program.id}/topics/${topic.id}`,
        method: 'delete',
        onSuccess: () => {
          flash.set('success', 'Successfully deleted topic')
          router.history.goBack()
        },
        onFailure: (result) => flash.set('error', 'Unable to delete topic')
      }
    }
  ] : []
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_topics/${props.params.id}/audits`,
  topic: `/api/admin/crm/programs/${props.params.program_id}/topics/${props.params.id}`,
  program: `/api/admin/crm/programs/${props.params.program_id}`,
  workflows: `/api/admin/crm/programs/${props.params.program_id}/topics/${props.params.id}/workflows`

})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Topic',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
