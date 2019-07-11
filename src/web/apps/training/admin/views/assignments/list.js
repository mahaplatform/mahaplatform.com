import { Page } from 'maha-admin'

const mapPropsToPage = (props, context) => ({
  title: 'Assignments',
  collection: {
    endpoint: '/api/admin/training/assignments',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'assigning.title', primary: true }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'assignment',
    icon: 'check',
    link: (record) => `/admin/training/assignments/${record.id}`
  }
})

export default Page(null, mapPropsToPage)
