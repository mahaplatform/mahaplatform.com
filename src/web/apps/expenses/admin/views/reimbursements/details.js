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

const Details = ({ reimbursement, commentUrl }) => {
  const list = {}
  if(reimbursement.status === 'incomplete') {
    list.alert = { color: 'grey', message: 'This reimbursement is missing required information' }
  }
  if(reimbursement.status === 'pending') {
    list.alert = { color: 'teal', message: 'This reimbursement has not yet been submitted' }
  }
  if(reimbursement.status === 'submitted') {
    list.alert = { color: 'blue', message: 'This reimbursement has been submitted for review' }
  }
  if(reimbursement.status === 'approved') {
    list.alert = { color: 'green', message: 'This reimbursement has been approved' }
  }
  if(reimbursement.status === 'rejected') {
    list.alert = { color: 'red', message: 'This reimbursement has been rejected' }
  }
  if(reimbursement.status === 'reviewed') {
    list.alert = { color: 'pink', message: 'This reimbursement has been reviewed' }
  }
  if(reimbursement.status === 'processed') {
    list.alert = { color: 'violet', message: 'This reimbursement was processed' }
  }
  list.items = [
    requiredField('User', reimbursement, 'user.full_name'),
    { label: 'Date', content: reimbursement.date, format: 'date' },
    requiredField('Vendor', reimbursement, 'vendor.name', { content: reimbursement, format: CompactVendorToken })
  ]
  if(reimbursement.line_items.length > 1) {
    list.items.push({ component: <LineItemsToken line_items={ reimbursement.line_items } active={ reimbursement.id } /> })
  } else {
    list.items.push({ label: 'Project', content: reimbursement.line_items[0].project.title })
    list.items.push({ label: 'Expense Type', content: reimbursement.line_items[0].expense_type.title })
    list.items.push({ label: 'Description', content: reimbursement.line_items[0].description })
    list.items.push({ label: 'Amount', content: reimbursement.line_items[0].amount })
  }

  if(reimbursement.receipts.length > 0) {
    const previews = reimbursement.receipts.filter(receipt => receipt.status === 'processed' && (receipt.has_preview || receipt.is_image))
    const slides = previews.map((receipt, index) => <Receipt key={`receipt_preview_${index}`} preview={ true } value={ receipt } />)
    list.header = <Carousel slides={ slides } />
    list.items.unshift({ content: reimbursement.receipts.map((receipt, index) => <Receipt key={`receipt_${index}`} preview={ false } value={ receipt } />), className: 'receipts' })
  } else {
    list.items.unshift(requiredField('Receipt', reimbursement, 'receipts_ids'))
  }
  list.items.push({ component: <Audit entries={ reimbursement.audit } /> })

  list.footer = <Comments entity={`expenses_reimbursements/${reimbursement.id}`} />

  return <List { ...list } />
}

Details.propTypes = {
  commentUrl: PropTypes.string,
  reimbursement: PropTypes.object
}

export default Details
