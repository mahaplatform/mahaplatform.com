import RevenueTypeToken from '../../tokens/revenue_type'
import ProjectToken from '../../tokens/project'
import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Products',
  collection: {
    endpoint: '/api/admin/finance/products',
    table: [
      { label: 'ID', key: 'id', primary: true, collapsing: true },
      { label: 'Title', key: 'title', sort: 'title', primary: true }
    ],
    filters: [
      { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/projects', value: 'id', text: 'title', format: ProjectToken },
      { label: 'Revenue Type', name: 'revenue_type_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/revenue_types', value: 'id', text: 'title', format: RevenueTypeToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'shopping-bag',
      title: 'No Products',
      text: 'You have not yet created any products',
      buttons: [
        { label: 'Create Product', modal: New }
      ]

    },
    entity: 'product',
    onClick: (record) => context.router.history.push(`/admin/finance/products/${record.id}`)
  },
  task: {
    label: 'New Product',
    icon: 'plus',
    modal:  New
  }
})

export default Page(null, mapPropsToPage)
