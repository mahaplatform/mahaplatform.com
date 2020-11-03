import { Page } from 'maha-admin'
import Contacts from './contacts'
import Details from './details'
import React from 'react'
import Edit from './edit'

const getTabs = ({ audits, contacts, topic }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } topic={ topic } /> },
    { label: 'Contacts', component: <Contacts topic={ topic } contacts={ contacts } /> }
  ]
})

const getTasks = ({ topic }, { flash, router }) => ({
  items: [
    { label: 'Edit Topic', show: !topic.deleted_at, modal: <Edit topic={ topic } /> },
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
  ]
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_topics/${props.params.id}/audits`,
  contacts: `/api/admin/crm/programs/${props.params.program_id}/topics/${props.params.id}/interests`,
  topic: `/api/admin/crm/programs/${props.params.program_id}/topics/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Topic',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
