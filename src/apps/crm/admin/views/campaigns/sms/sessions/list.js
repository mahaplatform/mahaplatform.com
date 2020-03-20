import ContactToken from '../../../../tokens/contact'
import StatusToken from '../../../../tokens/status'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Sessions',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/campaigns/sms/${props.params.campaign_id}/sessions`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', primary: true, format: (enrollment) => <ContactToken property="phone_name" { ...enrollment.contact } /> },
      { label: 'Created', key: 'created_at', format: 'datetime' },
      { label: 'Converted', key: 'was_converted', collapsing: true, format: 'check' },
      { label: 'Status', key: 'status', collapsing: true, format: StatusToken }

    ],
    empty: {
      icon: 'comments',
      title: 'No Sessions',
      text: 'There are not yet any sessions for this sms campaign'
    },
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'enrollment',
    onClick: (record) => context.router.history.push(`/admin/crm/campaigns/sms/${props.params.campaign_id}/sessions/${record.id}`),
    selectable: true,
    selectValue: 'id',
    recordTasks: (record) => [
      {
        label: 'Delete Session',
        request: {
          endpoint: `/api/admin/crm/campaigns/sms/${props.params.campaign_id}/sessions/${record.id}`,
          method: 'DELETE',
          confirm: 'Are you sure you want to delete this session?'
        }
      }
    ],
    buttons: (selected, onSuccess) => [{
      color: 'red',
      text: 'Delete Selected',
      confirm: 'Are you sure you want to delete these sessions?',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/crm/campaigns/sms/${props.params.campaign_id}/sessions/delete`,
        body: {
          filter: selected.filter
        }
      }
    }]
  }
})

export default Page(null, mapPropsToPage)
