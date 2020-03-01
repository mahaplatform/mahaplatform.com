import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Enrollments',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/workflows/${props.params.workflow_id}/enrollments`,
    table: [
      { label: 'ID', key: 'id', width: 80, visible: false },
      { label: 'Contact', key: 'contact.display_name', primary: true }
    ],
    empty: {
      icon: 'user',
      title: 'No Enrollments',
      text: 'There are no contacts enrolled in this workflow',
      buttons: [
        { label: 'Enroll Contact', modal: New }
      ]
    },
    defaultSort: { key: 'created_at', order: 'asc' },
    entity: 'enrollment',
    onClick: (record) => context.router.history.push(`/admin/crm/workflows/${props.params.workflow_id}/enrollments/${record.id}`)
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
