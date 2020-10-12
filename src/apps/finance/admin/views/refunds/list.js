import PaymentTypeToken from '../../tokens/payment_type'
import StatusToken from '../../tokens/status_token'
import Status from '../../tokens/status'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Payments',
  rights: ['finance:manage_revenue'],
  collection: {
    endpoint: '/api/admin/finance/refunds',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { collapsing: true, primary: true, format: (refund) => <PaymentTypeToken { ...refund.payment } />},
      { label: 'Customer', key: 'payment.customer.display_name', sort: 'customer', primary: true },
      { label: 'Date', key: 'created_at', collapsing: true, primary: true, format: 'date' },
      { label: 'Amount', key: 'amount', collapsing: true, primary: true, format: 'currency' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, padded: true, format: Status }
    ],
    filters: [
      { label: 'Bank Account', name: 'bank_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/banks', value: 'id', text: 'title' },
      { label: 'Customer', name: 'customer_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/customers', value: 'id', text: 'display_name', sort: { key: 'last_name', order: 'asc' } },
      { label: 'Method', name: 'method', type: 'select', multiple: true, options: [{value:'cash',text:'Cash'},{value:'check',text:'Check'},{value:'ach',text:'Bank Account'},{value:'card',text:'Credit Card'},{value:'googlepay',text:'Google Pay'},{value:'applepay',text:'Apple Pay'},{value:'paypal',text:'PayPal'}] },
      { label: 'Card Type', name: 'card_type', type: 'select', multiple: true, options: [{value:'visa',text:'Visa'},{value:'mastercard',text:'Master Card'},{value:'amex',text:'American Express'},{value:'discover',text:'Discover'},{value:'jcb',text:'JCB'}] },
      { label: 'Status', name: 'status', type: 'select', multiple: true, options: ['captured','settled','deposited','received','voided'], format: StatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/finance/refunds/${record.id}`),
    empty: {
      icon: 'dollar',
      title: 'No Refunds',
      text: 'You have not yet refunded any payments'
    },
    entity: 'refund'
  }
})

export default Page(null, mapPropsToPage)
