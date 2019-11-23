import PaymentTypeToken from '../../tokens/payment_type'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Payments',
  collection: {
    endpoint: '/api/admin/finance/payments',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { primary: true, format: PaymentTypeToken, collapsing: true },
      { label: 'Contact', key: 'contact.display_name', primary: true },
      { label: 'Date', key: 'date', primary: true, format: 'date' },
      { label: 'Amount', key: 'amount', primary: true, format: 'currency', collapsing: true  }
    ],
    filters: [
      { label: 'Contact', name: 'contact_id', type: 'select', multiple: true, endpoint: '/api/admin/crm/contacts', value: 'id', text: 'display_name', sort: { key: 'last_name', order: 'asc' } },
      { label: 'Method', name: 'method', type: 'select', multiple: true, options: [{value:'cash',text:'Cash'},{value:'check',text:'Check'},{value:'card',text:'Credit Card'},{value:'googlepay',text:'Google Pay'},{value:'applepay',text:'Apple Pay'},{value:'paypal',text:'PayPal'}] },
      { label: 'Card Type', name: 'card_type', type: 'select', multiple: true, options: [{value:'visa',text:'Visa'},{value:'mastercard',text:'Master Card'},{value:'amex',text:'American Express'},{value:'discover',text:'Discover'},{value:'jcb',text:'JCB'}] }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/admin/finance/invoices/${record.id}`),
    empty: {
      icon: 'dollar',
      title: 'No Payment',
      text: 'You have not yet created any payments'
    },
    entity: 'payment'
  }
})

export default Page(null, mapPropsToPage)
