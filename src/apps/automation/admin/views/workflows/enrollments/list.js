import ContactToken from '@apps/crm/admin/tokens/contact'
import WorkflowStatusToken from '../../../tokens/workflow_status'
import { Page } from '@admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Enrollments',
  rights: [],
  collection: {
    endpoint: `/api/admin/automation/workflows/${props.params.workflow_id}/enrollments`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', primary: true, format: (enrollment) => <ContactToken { ...enrollment.contact } /> },
      { label: 'Enrolled At', key: 'created_at', format: 'datetime' },
      { label: 'Converted', key: 'was_converted', collapsing: true, format: 'check' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, padded: true, format: WorkflowStatusToken }
    ],
    empty: {
      icon: 'user',
      title: 'No Enrollments',
      text: 'There are no contacts enrolled in this workflow',
      buttons: [
        { label: 'Enroll Contact', modal: New }
      ]
    },
    defaultSort: { key: '-created_at', order: 'asc' },
    entity: 'enrollment',
    onClick: (record) => context.router.history.push(`/automation/workflows/${props.params.workflow_id}/enrollments/${record.id}`)
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Enroll Contact',
        modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
