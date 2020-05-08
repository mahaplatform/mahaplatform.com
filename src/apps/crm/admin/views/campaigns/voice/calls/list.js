import ContactToken from '../../../../tokens/contact'
import { Page, TwilioStatusToken } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Calls',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/campaigns/voice/${props.params.campaign_id}/calls`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', primary: true, format: (enrollment) => <ContactToken { ...enrollment.contact } /> },
      { label: 'Date', key: 'created_at', format: 'datetime' },
      { label: 'Duration', key: 'call.duration', collapsing: true, format: 'duration', align: 'right' },
      { label: 'Status', key: 'call.status', collapsing: true, primary: true, padded: true, format: TwilioStatusToken }
    ],
    empty: {
      icon: 'phone',
      title: 'No Calls',
      text: 'There are no contacts enrolled in this voice campaign'
    },
    defaultSort: { key: '-created_at', order: 'asc' },
    entity: 'enrollment',
    onClick: (record) => context.router.history.push(`/admin/crm/campaigns/voice/${props.params.campaign_id}/calls/${record.id}`),
    selectable: true,
    selectValue: 'id',
    buttons: (selected, onSuccess) => [{
      color: 'red',
      text: 'Delete Selected',
      confirm: 'Are you sure you want to delete these calls?',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/crm/campaigns/voice/${props.params.campaign_id}/calls/delete`,
        body: {
          filter: selected.filter
        }
      }
    }]
  }
})

export default Page(null, mapPropsToPage)
