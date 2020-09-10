import Contacts from './contacts'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'
import Edit from './edit'

const getTabs = ({ audits, contacts, list }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } list={ list } /> },
    { label: 'Contacts', component: <Contacts list={ list } contacts={ contacts } /> }
  ]
})

const getTasks = ({ list }) => ({
  items: [
    { label: 'Edit List', show: !list.deleted_at, modal: <Edit list={ list } /> },
    {
      label: 'Delete List',
      show: !list.deleted_at,
      confirm: `
        Are you sure you want to delete this list? You will also remove all of
        the contacts and delete any associated workflow, emails, and performance
        data
      `,
      request: {
        endpoint: `/api/admin/crm/programs/${list.program.id}/lists/${list.id}`,
        method: 'delete'
      }
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_lists/${props.params.id}/audits`,
  contacts: `/api/admin/crm/programs/${props.params.program_id}/lists/${props.params.id}/subscriptions`,
  list: `/api/admin/crm/programs/${props.params.program_id}/lists/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'List',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
