import Contacts from './contacts'
import { Page } from '@admin'
import Details from './details'
import React from 'react'
import Edit from './edit'

const getTabs = ({ audits, contacts, list }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } list={ list } /> },
    { label: 'Contacts', component: <Contacts list={ list } contacts={ contacts } /> }
  ]
})

const getTasks = ({ list, program }, { flash, router }) => ({
  items: program.access_type === 'manage' ? [
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
        method: 'delete',
        onSuccess: () => {
          flash.set('success', 'Successfully deleted list')
          router.history.goBack()
        },
        onFailure: (result) => flash.set('error', 'Unable to delete list')
      }
    }
  ] : []
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_lists/${props.params.id}/audits`,
  contacts: `/api/admin/crm/programs/${props.params.program_id}/lists/${props.params.id}/subscriptions`,
  list: `/api/admin/crm/programs/${props.params.program_id}/lists/${props.params.id}`,
  program: `/api/admin/crm/programs/${props.params.program_id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'List',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
