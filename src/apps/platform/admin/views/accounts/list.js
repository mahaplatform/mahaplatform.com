import { AccountToken, Page } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Accounts',
  collection: {
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Name', key: 'full_name', primary: true, format: AccountToken }
    ],
    endpoint: '/api/admin/platform/accounts',
    entity: 'account',
    defaultSort: { key: 'last_name', order: 'asc' },
    onClick: (record) => context.router.history.push(`/platform/accounts/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
