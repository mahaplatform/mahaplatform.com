import CompactExpenseTypeToken from '../../tokens/expense_type/compact'
import CompactProjectToken from '../../tokens/project/compact'
import CompactVendorToken from '../../tokens/vendor/compact'
import { Audit, List, Comments, Carousel } from 'maha-admin'
import AllocationsToken from '../../tokens/allocations'
import Receipt from '../../components/receipt'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const requiredField = (label, item, path, extra) => {
  if(!_.isNil(_.get(item, path))) {
    return { label, content: _.get(item, path), ...extra }
  } else  {
    return { label, content: 'REQUIRED', className: 'error' }
  }
}

const Details = ({ check }) => {
  const list = {}
  if(check.deleted_at !== null) {
    list.alert = { color: 'red', message: 'This check was deleted' }
  } else if(check.status === 'incomplete') {
    list.alert = { color: 'grey', message: 'This check is missing required information' }
  } else if(check.status === 'pending') {
    list.alert = { color: 'teal', message: 'This check has not yet been submitted' }
  } else if(check.status === 'submitted') {
    list.alert = { color: 'blue', message: 'This check has been submitted for review' }
  } else if(check.status === 'approved') {
    list.alert = { color: 'green', message: 'This check has been approved' }
  } else if(check.status === 'rejected') {
    list.alert = { color: 'red', message: 'This check has been rejected' }
  } else if(check.status === 'reviewed') {
    list.alert = { color: 'pink', message: 'This check has been reviewed' }
  } else if(check.status === 'exported') {
    list.alert = { color: 'violet', message: 'This check was exported' }
  }
  list.items = [
    requiredField('User', check, 'user.full_name'),
    requiredField('Date Needed', check, 'date_needed', { content: check.date_needed, format: 'date' }),
    requiredField('Vendor', check, 'vendor.name', { content: check, format: CompactVendorToken }),
    requiredField('Delivery Method', check, 'delivery_method'),
    { label: 'Account Number', content: check.account_number },
    { label: 'Invoice Number', content: check.invoice_number }
  ]
  if(check.allocations.length > 1 ) {
    list.items.push(requiredField('Total', check, 'total', { content: check.total, format: 'currency' }))
    list.items.push(requiredField('Tax', check, 'tax_total', { content: check.tax_total, format: 'currency' }))
    list.items.push({ component: <AllocationsToken allocations={ check.allocations } item={ check } /> })
  } else {
    list.items.push(requiredField('Project', check, 'project.title', { content: check, format: CompactProjectToken }))
    list.items.push(requiredField('Expense Type', check, 'expense_type.title', { content: check, format: CompactExpenseTypeToken }))
    list.items.push(requiredField('Description', check, 'description', { content: check.description }))
    list.items.push(requiredField('Amount', check, 'amount', { content: check.amount, format: 'currency' }))
    list.items.push(requiredField('Tax', check, 'tax', { content: check.tax, format: 'currency' }))
  }
  if(check.receipts.length > 0) {
    const previews = check.receipts.filter(receipt => receipt.status === 'processed' && (receipt.has_preview || receipt.is_image))
    const slides = previews.map((receipt, index) => <Receipt key={`receipt_preview_${index}`} preview={ true } value={ receipt } />)
    list.header = <Carousel slides={ slides } />
    list.items.unshift({ content: check.receipts.map((receipt, index) => <Receipt key={`receipt_${index}`} preview={ false } value={ receipt } />), className: 'receipts' })
  } else {
    list.items.unshift(requiredField('Receipt', check, 'receipts_ids'))
  }
  list.items.push({ component: <Audit entries={ check.audit } /> })

  list.footer = <Comments entity={`finance_checks/${check.id}`} active={ check.deleted_at === null } />

  return <List { ...list } />
}

Details.propTypes = {
  check: PropTypes.object,
  commentUrl: PropTypes.string
}

export default Details
