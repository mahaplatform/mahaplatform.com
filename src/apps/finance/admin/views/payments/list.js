import PaymentTypeToken from '../../tokens/payment_type'
import StatusToken from '../../tokens/status_token'
import Status from '../../tokens/status'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Payments',
  collection: {
    endpoint: '/api/admin/finance/payments',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { width: 50, primary: true, format: PaymentTypeToken},
      { label: 'Customer', key: 'invoice.customer.display_name', sort: 'customer', primary: true },
      { label: 'Method', key: 'method', collapsing: true, primary: true },
      { label: 'Date', key: 'date', collpasing: true, primary: true, format: 'date' },
      { label: 'Amount', key: 'amount', collapsing: true, primary: true, format: 'currency' },
      { label: 'Status', key: 'status', collpasing: true, primary: true, padded: true, format: Status  }
    ],
    filters: [
      { label: 'Merchant Account', name: 'merchant_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/merchants', value: 'id', text: 'title' },
      { label: 'Customer', name: 'customer_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/customers', value: 'id', text: 'display_name', sort: { key: 'last_name', order: 'asc' } },
      { label: 'Method', name: 'method', type: 'select', multiple: true, options: [{value:'cash',text:'Cash'},{value:'check',text:'Check'},{value:'ach',text:'Bank Account'},{value:'card',text:'Credit Card'},{value:'googlepay',text:'Google Pay'},{value:'applepay',text:'Apple Pay'},{value:'paypal',text:'PayPal'}] },
      { label: 'Card Type', name: 'card_type', type: 'select', multiple: true, options: [{value:'visa',text:'Visa'},{value:'mastercard',text:'Master Card'},{value:'amex',text:'American Express'},{value:'discover',text:'Discover'},{value:'jcb',text:'JCB'}] },
      { label: 'Status', name: 'status', type: 'select', multiple: true, options: ['captured','settled','disbursed','received','voided'], format: StatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/admin/finance/payments/${record.id}`),
    empty: {
      icon: 'dollar',
      title: 'No Payments',
      text: 'You have not yet received any payments'
    },
    entity: 'payment'
  }
})

export default Page(null, mapPropsToPage)
