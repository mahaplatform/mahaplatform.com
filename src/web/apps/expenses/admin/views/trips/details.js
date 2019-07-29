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

const Details = ({ trip, commentUrl }) => {
  const list = {}
  if(trip.status === 'incomplete') {
    list.alert = { color: 'grey', message: 'This trip is missing required information' }
  }
  if(trip.status === 'pending') {
    list.alert = { color: 'teal', message: 'This trip has not yet been submitted' }
  }
  if(trip.status === 'submitted') {
    list.alert = { color: 'blue', message: 'This trip has been submitted for review' }
  }
  if(trip.status === 'approved') {
    list.alert = { color: 'green', message: 'This trip has been approved' }
  }
  if(trip.status === 'rejected') {
    list.alert = { color: 'red', message: 'This trip has been rejected' }
  }
  if(trip.status === 'reviewed') {
    list.alert = { color: 'pink', message: 'This trip has been reviewed' }
  }
  if(trip.status === 'processed') {
    list.alert = { color: 'violet', message: 'This trip was processed' }
  }
  list.items = [
    requiredField('User', trip, 'user.full_name'),
    requiredField('Date', trip, 'date', { content: trip.date, format: 'date' }),
    { label: 'Description ', content: trip.description },
    requiredField('Project', trip, 'project.title', { content: trip, format: CompactProjectToken }),
    requiredField('Expense Type', trip, 'expense_type.title', { content: trip, format: CompactExpenseTypeToken }),
    { label: 'Time Leaving', content: trip.time_leaving, format: 'time|hh:mm A', empty: 'NONE' },
    { label: 'Time Arriving ', content: trip.time_arriving, format: 'time|hh:mm A', empty: 'NONE' },
    requiredField('Odometer Start', trip, 'odometer_start'),
    requiredField('Odometer End', trip, 'odometer_end'),
    requiredField('Total Miles', trip, 'total_miles', { units: 'mi' }),
    requiredField('Mileage Rate', trip, 'mileage_rate', { format: 'number|$0.000' }),
    requiredField('Amount', trip, 'amount', { format: 'currency' })
  ]
  list.items.push({ component: <Audit entries={ trip.audit } /> })

  list.footer = <Comments entity={`expenses_trips/${trip.id}`} />

  return <List { ...list } />
}

Details.propTypes = {
  trip: PropTypes.object,
  commentUrl: PropTypes.string
}

export default Details
