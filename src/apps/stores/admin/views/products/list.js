import New from '../../components/productform'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Products',
  collection: {
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true }
    ],
    empty: {
      icon: 'shopping-bag',
      title: 'No Products',
      text: 'You have not yet created any products',
      buttons: [
        { label: 'Create Product', modal: New }
      ]
    },
    endpoint: '/api/admin/stores/products',
    entity: 'store',
    defaultSort: { key: 'title', order: 'asc' },
    onClick: (record) => context.router.history.push(`/admin/stores/products/${record.id}`)
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
