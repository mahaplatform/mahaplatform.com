import CompactExpenseTypeToken from '../../tokens/expense_type/compact'
import CompactProjectToken from '../../tokens/project/compact'
import { Audit, Comments, List } from 'maha-admin'
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

const Details = ({ advance, commentUrl }) => {
  const list = {}
  if(advance.status === 'incomplete') {
    list.alert = { color: 'grey', message: 'This advance is missing required information' }
  }
  if(advance.status === 'pending') {
    list.alert = { color: 'teal', message: 'This advance has not yet been submitted' }
  }
  if(advance.status === 'submitted') {
    list.alert = { color: 'blue', message: 'This advance has been submitted for review' }
  }
  if(advance.status === 'approved') {
    list.alert = { color: 'green', message: 'This advance has been approved' }
  }
  if(advance.status === 'rejected') {
    list.alert = { color: 'red', message: 'This advance has been rejected' }
  }
  if(advance.status === 'reviewed') {
    list.alert = { color: 'pink', message: 'This advance has been reviewed' }
  }
  if(advance.status === 'processed') {
    list.alert = { color: 'violet', message: 'This advance was processed' }
  }
  list.items = [
    requiredField('User', advance, 'user.full_name'),
    { label: 'Date Needed', content: advance.date_needed, format: 'date' },
    { label: 'Description', content: advance.description },
    { label: 'Amount', content: advance.amount, format: 'currency' },
    requiredField('Project', advance, 'project.title', { content: advance, format: CompactProjectToken }),
    requiredField('Expense Type', advance, 'expense_type.title', { content: advance, format: CompactExpenseTypeToken })
  ]
  list.items.push({ component: <Audit entries={ advance.audit } /> })

  list.footer = <Comments entity={`expenses_advances/${advance.id}`} />

  return <List { ...list } />
}

Details.propTypes = {
  advance: PropTypes.object,
  commentUrl: PropTypes.string
}

export default Details
