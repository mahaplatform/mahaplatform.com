import CompactExpenseTypeToken from '../../tokens/expense_type/compact'
import CompactProjectToken from '../../tokens/project/compact'
import CompactVendorToken from '../../tokens/vendor/compact'
import { Audit, List, Comments, Carousel } from 'maha-admin'
import LineItemsToken from '../../tokens/line_items'
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

const Details = ({ expense, commentUrl }) => {
  const list = {}
  if(expense.status === 'incomplete') {
    list.alert = { color: 'grey', message: 'This expense is missing required information' }
  }
  if(expense.status === 'pending') {
    list.alert = { color: 'teal', message: 'This expense has not yet been submitted' }
  }
  if(expense.status === 'submitted') {
    list.alert = { color: 'blue', message: 'This expense has been submitted for review' }
  }
  if(expense.status === 'approved') {
    list.alert = { color: 'green', message: 'This expense has been approved' }
  }
  if(expense.status === 'rejected') {
    list.alert = { color: 'red', message: 'This expense has been rejected' }
  }
  if(expense.status === 'reviewed') {
    list.alert = { color: 'pink', message: 'This expense has been reviewed' }
  }
  if(expense.status === 'processed') {
    list.alert = { color: 'violet', message: 'This expense was processed' }
  }
  list.items = [
    requiredField('User', expense, 'user.full_name'),
    requiredField('Date', expense, 'date', { content: expense, format: 'date' }),
    requiredField('Vendor', expense, 'vendor.name', { content: expense, format: CompactVendorToken }),
    requiredField('Account', expense, 'account.name')
  ]
  list.items.push({ component: <LineItemsToken line_items={ expense.line_items } active={ expense.id } /> })
  if(expense.receipts.length > 0) {
    const previews = expense.receipts.filter(receipt => receipt.status === 'processed' && (receipt.has_preview || receipt.is_image))
    const slides = previews.map((receipt, index) => <Receipt key={`receipt_preview_${index}`} preview={ true } value={ receipt } />)
    list.header = <Carousel slides={ slides } />
    list.items.unshift({ content: expense.receipts.map((receipt, index) => <Receipt key={`receipt_${index}`} preview={ false } value={ receipt } />), className: 'receipts' })
  } else {
    list.items.unshift(requiredField('Receipt', expense, 'receipts_ids'))
  }
  list.items.push({ component: <Audit entries={ expense.audit } /> })

  list.footer = <Comments entity={`expenses_expenses/${expense.id}`} />

  return <List { ...list } />
}

Details.propTypes = {
  commentUrl: PropTypes.string,
  expense: PropTypes.object
}

export default Details
