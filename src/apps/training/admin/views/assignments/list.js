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
    empty: {
      icon: 'check',
      title: 'No Assignments',
      text: 'You have not been assigned any trainings'
    },
    entity: 'assignment',
    onClick: (record) => context.router.history.push(`/admin/training/assignments/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
