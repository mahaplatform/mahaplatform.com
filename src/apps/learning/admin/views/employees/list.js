import { Page, UserToken } from '@admin'
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Employees',
  collection: {
    endpoint: '/api/admin/learning/employees',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Name', key: 'full_name', primary: true, format: UserToken }
    ],
    defaultSort: { key: 'last_name', order: 'asc' },
    empty: {
      icon: 'user-circle',
      title: 'No Employees',
      text: 'You have not yet created any employees',
      buttons: [
        { label: 'Create Employee', modal: New }
      ]
    },
    entity: 'employee',
    onClick: (record) => context.router.history.push(`/learning/employees/${record.id}`)
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
