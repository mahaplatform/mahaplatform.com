import CompactExpenseTypeToken from '../../tokens/expense_type/compact'
import CompactProjectToken from '../../tokens/project/compact'
import { Audit, Comments, List } from '@admin'
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

const Details = ({ advance }) => {
  const list = {}
  if(advance.deleted_at !== null) {
    list.alert = { color: 'red', message: 'This advance was deleted' }
  } else if(advance.status === 'incomplete') {
    list.alert = { color: 'grey', message: 'This advance is missing required information' }
  } else if(advance.status === 'pending') {
    list.alert = { color: 'teal', message: 'This advance has not yet been submitted' }
  } else if(advance.status === 'submitted') {
    list.alert = { color: 'blue', message: 'This advance has been submitted for review' }
  } else if(advance.status === 'approved') {
    list.alert = { color: 'green', message: 'This advance has been approved' }
  } else if(advance.status === 'rejected') {
    list.alert = { color: 'red', message: 'This advance has been rejected' }
  } else if(advance.status === 'reviewed') {
    list.alert = { color: 'pink', message: 'This advance has been reviewed' }
  } else if(advance.status === 'exported') {
    list.alert = { color: 'violet', message: 'This advance was exported' }
  }
  list.items = [
    requiredField('User', advance, 'user.full_name'),
    requiredField('Date Needed', advance, 'date_needed', { content: advance.date_needed, format: 'date' }),
    requiredField('Project', advance, 'project.title', { content: advance, format: CompactProjectToken }),
    requiredField('Expense Type', advance, 'expense_type.title', { content: advance, format: CompactExpenseTypeToken }),
    requiredField('Description', advance, 'description'),
    requiredField('Amount', advance, 'amount')
  ]
  list.items.push({ component: <Audit entries={ advance.audit } /> })

  list.footer = <Comments entity={`finance_advances/${advance.id}`} active={ advance.deleted_at === null } />

  return <List { ...list } />
}

Details.propTypes = {
  advance: PropTypes.object
}

export default Details
