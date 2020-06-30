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

const Details = ({ reimbursement }) => {
  const list = {}
  if(reimbursement.deleted_at !== null) {
    list.alert = { color: 'red', message: 'This reimbursement was deleted' }
  } else if(reimbursement.status === 'incomplete') {
    list.alert = { color: 'grey', message: 'This reimbursement is missing required information' }
  } else if(reimbursement.status === 'pending') {
    list.alert = { color: 'teal', message: 'This reimbursement has not yet been submitted' }
  } else if(reimbursement.status === 'submitted') {
    list.alert = { color: 'blue', message: 'This reimbursement has been submitted for review' }
  } else if(reimbursement.status === 'approved') {
    list.alert = { color: 'green', message: 'This reimbursement has been approved' }
  } else if(reimbursement.status === 'rejected') {
    list.alert = { color: 'red', message: 'This reimbursement has been rejected' }
  } else if(reimbursement.status === 'reviewed') {
    list.alert = { color: 'pink', message: 'This reimbursement has been reviewed' }
  } else if(reimbursement.status === 'exported') {
    list.alert = { color: 'violet', message: 'This reimbursement was exported' }
  }
  list.items = [
    requiredField('User', reimbursement, 'user.full_name'),
    requiredField('Date', reimbursement, 'date', { content: reimbursement.date, format: 'date' }),
    requiredField('Vendor', reimbursement, 'vendor.name', { content: reimbursement, format: CompactVendorToken }),
    requiredField('Total', reimbursement, 'total', { content: reimbursement.total, format: 'currency' })
  ]
  if(reimbursement.allocations.length > 1 ) {
    list.items.push({ component: <AllocationsToken allocations={ reimbursement.allocations } item={ reimbursement } /> })
  } else {
    list.items.push(requiredField('Project', reimbursement, 'project.title', { content: reimbursement, format: CompactProjectToken }))
    list.items.push(requiredField('Expense Type', reimbursement, 'expense_type.title', { content: reimbursement, format: CompactExpenseTypeToken }))
    list.items.push(requiredField('Description', reimbursement, 'description', { content: reimbursement.description }))
    list.items.push(requiredField('Amount', reimbursement, 'amount', { content: reimbursement.amount, format: 'currency' }))
  }
  if(reimbursement.receipts.length > 0) {
    const previews = reimbursement.receipts.filter(receipt => receipt.status === 'exported' && (receipt.has_preview || receipt.is_image))
    const slides = previews.map((receipt, index) => <Receipt key={`receipt_preview_${index}`} preview={ true } value={ receipt } />)
    list.header = <Carousel slides={ slides } />
    list.items.unshift({ content: reimbursement.receipts.map((receipt, index) => <Receipt key={`receipt_${index}`} preview={ false } value={ receipt } />), className: 'receipts' })
  } else {
    list.items.unshift(requiredField('Receipt', reimbursement, 'receipts_ids'))
  }
  list.items.push({ component: <Audit entries={ reimbursement.audit } /> })

  list.footer = <Comments entity={`finance_reimbursements/${reimbursement.id}`} active={ reimbursement.deleted_at === null } />

  return <List { ...list } />
}

Details.propTypes = {
  commentUrl: PropTypes.string,
  reimbursement: PropTypes.object
}

export default Details
