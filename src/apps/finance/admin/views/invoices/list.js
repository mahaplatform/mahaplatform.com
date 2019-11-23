import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Invoices',
  collection: {
    endpoint: '/api/admin/finance/invoices',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Code', key: 'code', primary: true, collapsing: true },
      { label: 'Contact', key: 'contact.display_name', primary: true },
      { label: 'Program', key: 'program.title', primary: true },
      { label: 'Date', key: 'date', primary: true, format: 'date', collapsing: true },
      { label: 'Total', key: 'total', primary: true, format: 'currency', collapsing: true  },
      { label: 'Paid', key: 'is_paid', primary: true, format: 'check_times', collapsing: true  }
    ],
    filters: [
      { label: 'Contact', name: 'contact_id', type: 'select', multiple: true, endpoint: '/api/admin/crm/contacts', value: 'id', text: 'display_name', sort: { key: 'last_name', order: 'asc' } },
      { label: 'Program', name: 'program_id', type: 'select', multiple: true, endpoint: '/api/admin/crm/programs', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/admin/finance/invoices/${record.code}`),
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
