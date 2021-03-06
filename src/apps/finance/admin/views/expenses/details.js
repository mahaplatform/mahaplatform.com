import CompactExpenseTypeToken from '../../tokens/expense_type/compact'
import CompactProjectToken from '../../tokens/project/compact'
import CompactVendorToken from '../../tokens/vendor/compact'
import { Audit, List, Comments, Carousel } from '@admin'
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

const Details = ({ expense }) => {
  const list = {}
  if(expense.deleted_at !== null) {
    list.alert = { color: 'red', message: 'This expense was deleted' }
  } else if(expense.status === 'incomplete') {
    list.alert = { color: 'grey', message: 'This expense is missing required information' }
  } else if(expense.status === 'pending') {
    list.alert = { color: 'teal', message: 'This expense has not yet been submitted' }
  } else if(expense.status === 'submitted') {
    list.alert = { color: 'blue', message: 'This expense has been submitted for review' }
  } else if(expense.status === 'approved') {
    list.alert = { color: 'green', message: 'This expense has been approved' }
  } else if(expense.status === 'rejected') {
    list.alert = { color: 'red', message: 'This expense has been rejected' }
  } else if(expense.status === 'reviewed') {
    list.alert = { color: 'pink', message: 'This expense has been reviewed' }
  } else if(expense.status === 'exported') {
    list.alert = { color: 'violet', message: 'This expense was exported' }
  }
  list.items = [
    requiredField('User', expense, 'user.full_name'),
    requiredField('Date', expense, 'date', { content: expense.date, format: 'date' }),
    requiredField('Vendor', expense, 'vendor.name', { content: expense, format: CompactVendorToken }),
    requiredField('Account', expense, 'account.name')
  ]
  if(expense.allocations.length > 1 ) {
    list.items.push(requiredField('Total', expense, 'total', { content: expense.total, format: 'currency' }))
    list.items.push(requiredField('Tax', expense, 'tax_total', { content: expense.tax_total, format: 'currency' }))
    list.items.push({ component: <AllocationsToken allocations={ expense.allocations } item={ expense } /> })
  } else {
    list.items.push(requiredField('Project', expense, 'project.title', { content: expense, format: CompactProjectToken }))
    list.items.push(requiredField('Expense Type', expense, 'expense_type.title', { content: expense, format: CompactExpenseTypeToken }))
    list.items.push(requiredField('Description', expense, 'description', { content: expense.description }))
    list.items.push(requiredField('Amount', expense, 'amount', { content: expense.amount, format: 'currency' }))
    list.items.push(requiredField('Tax', expense, 'tax', { content: expense.tax, format: 'currency' }))
  }
  if(expense.receipts.length > 0) {
    const previews = expense.receipts.filter(receipt => receipt.status === 'processed' && (receipt.has_preview || receipt.is_image))
    const slides = previews.map((receipt, index) => <Receipt key={`receipt_preview_${index}`} preview={ true } value={ receipt } />)
    list.header = <Carousel slides={ slides } />
    list.items.unshift({ content: expense.receipts.map((receipt, index) => <Receipt key={`receipt_${index}`} preview={ false } value={ receipt } />), className: 'receipts' })
  } else {
    list.items.unshift(requiredField('Receipt', expense, 'receipts_ids'))
  }
  list.items.push({ component: <Audit entries={ expense.audit } /> })

  list.footer = <Comments entity={`finance_expenses/${expense.id}`} active={ expense.deleted_at === null } />

  return <List { ...list } />
}

Details.propTypes = {
  commentUrl: PropTypes.string,
  expense: PropTypes.object
}

export default Details
