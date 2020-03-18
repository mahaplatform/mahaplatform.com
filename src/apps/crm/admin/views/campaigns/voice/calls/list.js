import ContactToken from '../../../../tokens/contact'
import { Page, TwilioStatusToken } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Calls',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/campaigns/voice/${props.params.campaign_id}/enrollments`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', primary: true, format: (enrollment) => <ContactToken { ...enrollment.contact } /> },
      { label: 'Status', key: 'call.status', collapsing: true, primary: true, padded: true, format: TwilioStatusToken }
    ],
    empty: {
      icon: 'phone',
      title: 'No Calls',
      text: 'There are no contacts enrolled in this voice campaign'
    },
    defaultSort: { key: '-created_at', order: 'asc' },
    entity: 'enrollment',
    onClick: (record) => context.router.history.push(`/admin/crm/campaigns/voice/${props.params.campaign_id}/calls/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
