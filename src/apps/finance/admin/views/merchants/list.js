import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Merchants',
  collection: {
    endpoint: '/api/admin/finance/merchants',
    table: [
      { label: 'ID', key: 'id', primary: true, collapsing: true },
      { label: 'Title', key: 'title', sort: 'title', primary: true }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'university',
      title: 'No Bank Accounts',
      text: 'You have not yet created any bank accounts',
      buttons: [
        { label: 'Create Bank Account', modal: New }
      ]
    },
    entity: 'bank account'
  },
  task: {
    label: 'New Bank Account',
    icon: 'plus',
    modal:  New
  }
})

export default Page(null, mapPropsToPage)
