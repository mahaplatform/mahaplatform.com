import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Invoices',
  collection: {
    endpoint: '/api/admin/finance/merchants',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/admin/finance/merchants/${record.id}`),
    empty: {
      icon: 'university',
      title: 'No Bank Accounts',
      text: 'You have not yet added any bank accounts',
      buttons: [
        { label: 'Add Bank Account', route: 'http://google.com' }
      ]
    },
    entity: 'invoice'
  },
  task: {
    label: 'Add Bank Account',
    icon: 'plus',
    route: 'http://google.com'
  }
})

export default Page(null, mapPropsToPage)
