import { Page } from 'maha-admin'

const mapPropsToPage = (props, context) => ({
  title: 'Assignments',
  collection: {
    endpoint: '/api/admin/training/assignments/report',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'User', key: 'user.full_name', primary: true },
      { label: 'Title', key: 'assigning.title', primary: true },
      { label: 'Configured', key: 'configured', primary: false, collapsing: true, centered: true, format: 'check_times' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'assignment',
    icon: 'check',
    link: (record) => `/admin/training/assignments/${record.id}`
  }
})

export default Page(null, mapPropsToPage)
