import { Page } from '@admin'

const mapPropsToPage = (props, context) => ({
  title: 'Employees',
  collection: {
    endpoint: '/api/admin/training/assignments/employees',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'assigning.title', primary: true },
      { label: 'Assigned By', key: 'assigning.assigned_by.full_name', primary: true },
      { label: 'User', key: 'user.full_name', primary: true }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'check',
      title: 'No Assignments',
      text: 'You have not yet created any assignments'
    },
    entity: 'assignment',
    onClick: (record) => context.router.history.push(`/training/assignments/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
