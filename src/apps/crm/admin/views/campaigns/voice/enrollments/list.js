import ContactToken from '../../../../tokens/contact'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Enrollments',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/campaigns/voice/${props.params.campaign_id}/enrollments`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', primary: true, format: (enrollment) => <ContactToken { ...enrollment.contact } /> }
    ],
    empty: {
      icon: 'user',
      title: 'No Enrollments',
      text: 'There are no contacts enrolled in this campaign'
    },
    defaultSort: { key: '-created_at', order: 'asc' },
    entity: 'enrollment',
    onClick: (record) => context.router.history.push(`/admin/crm/campaigns/voice/${props.params.campaign_id}/enrollments/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
