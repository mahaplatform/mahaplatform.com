import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Invoices',
  collection: {
    endpoint: '/api/admin/finance/invoices',
    table: [
      { label: 'ID', key: 'id', primary: true, collapsing: true },
      { label: 'Code', key: 'code', sort: 'code', primary: true }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'dollar',
      title: 'No Invoice',
      text: 'You have not yet created any invoices',
      buttons: [
        { label: 'Create Invoice', modal: New }
      ]
    },
    entity: 'invoice'
  },
  task: {
    label: 'New Invoice',
    icon: 'plus',
    modal:  New
  }
})

export default Page(null, mapPropsToPage)
