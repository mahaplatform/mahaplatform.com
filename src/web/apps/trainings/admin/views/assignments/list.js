import { Page } from 'maha-admin'

const mapPropsToPage = (props, context) => ({
  title: 'Assignments',
  collection: {
    endpoint: '/api/admin/trainings/assignments',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Training', key: 'training.title', primary: true },
      { label: 'Assigned', key: 'created_at', primary: false, format: 'date' },
      { label: 'Completed', key: 'is_complete', primary: false, format: 'check' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'assignment',
    icon: 'check',
    link: (record) => `/admin/trainings/assignments/${record.id}`
  }
})

export default Page(null, mapPropsToPage)
