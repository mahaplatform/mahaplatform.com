import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Merchant Accounts',
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
      title: 'No Merchant Accounts',
      text: 'You have not yet added any merchant accounts',
      buttons: [
        { label: 'Add Merchant Account', route: 'http://google.com' }
      ]
    },
    entity: 'invoice'
  },
  task: {
    label: 'Add Merchant Account',
    icon: 'plus',
    route: 'http://google.com'
  }
})

export default Page(null, mapPropsToPage)
