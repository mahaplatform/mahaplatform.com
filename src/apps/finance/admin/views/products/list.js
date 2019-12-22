import RevenueTypeToken from '../../tokens/revenue_type'
import ProjectToken from '../../tokens/project'
import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Products',
  collection: {
    endpoint: '/api/admin/finance/products',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Price', key: 'price', primary: true  },
      { label: 'Tax Rate', key: 'tax_rate', visible: false, collapsing: true  }
    ],
    filters: [
      { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/projects', value: 'id', text: 'title', format: ProjectToken },
      { label: 'Revenue Type', name: 'revenue_type_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/revenue_types', value: 'id', text: 'title', format: RevenueTypeToken },
      { label: 'Tax Deductible', name: 'is_tax_deductible', type: 'select', options: [{ value: true, text: 'Yes' },{ value: false, text: 'No' }] }
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
