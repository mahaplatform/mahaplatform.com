import WorkflowStatusToken from '@apps/automation/admin/tokens/workflow_status'
import ContactToken from '@apps/crm/admin/tokens/contact'
import { Page } from '@admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Calls',
  rights: [],
  collection: {
    endpoint: `/api/admin/campaigns/voice/${props.params.campaign_id}/calls`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', primary: true, format: (enrollment) => <ContactToken { ...enrollment.contact } /> },
      { label: 'Date', key: 'created_at', format: 'datetime' },
      { label: 'Duration', key: 'call.duration', collapsing: true, format: 'duration', align: 'right' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, padded: true, format: WorkflowStatusToken }
    ],
    empty: {
      icon: 'phone',
      title: 'No Calls',
      text: 'There are no contacts enrolled in this voice campaign'
    },
    defaultSort: { key: '-created_at', order: 'asc' },
    entity: 'enrollment',
    onClick: (record) => context.router.history.push(`/campaigns/voice/${props.params.campaign_id}/calls/${record.id}`),
    selectable: true,
    selectValue: 'id',
    buttons: (selected, onSuccess) => [{
      color: 'red',
      text: 'Delete Selected',
      confirm: 'Are you sure you want to delete these calls?',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/campaigns/voice/${props.params.campaign_id}/calls/delete`,
        body: {
          filter: selected.filter
        }
      }
    }]
  }
})

export default Page(null, mapPropsToPage)
