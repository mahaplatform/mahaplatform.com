import { CompactUserToken, List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import Edit from './edit'

const Details = ({ offering }) => {

  const list = {}

  if(offering.limit && offering.assignments_count === offering.limit) {
    list.alert = { color: 'blue', message: 'This offering is full' }
  }

  list.items = [
    { label: 'Training', content: offering.training.title },
    { label: 'Date', content: moment(offering.date).format('dddd, MMMM DD, YYYY') },
    { label: 'Time', content: <span>{ moment(`2019-01-01 ${offering.starts_at}`).format('hh:mm A') } - { moment(`2019-01-01 ${offering.ends_at}`).format('hh:mm A') }</span> },
    { label: 'Facilitator', content: offering.facilitator },
    { label: 'Location', content: offering.location },
    { label: 'Limit', content: offering.limit }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  offering: PropTypes.object
}

const Assignments = ({ assignments }) => {

  const list = {
    items: assignments.map(assignment => ({
      link: `/admin/learning/assignments/${assignment.id}`,
      content: assignment,
      component: ({ employee }) => <CompactUserToken { ...employee } />
    })),
    empty: {
      icon: 'user',
      title: 'No attendees',
      text: 'There are no attendees for this offering'
    }
  }

  return <List { ...list } />

}

Assignments.propTypes = {
  assignments: PropTypes.array
}

const mapResourcesToPage = (props, context) => ({
  offering: `/api/admin/learning/trainings/${props.params.training_id}/offerings/${props.params.id}`,
  assignments: `/api/admin/learning/trainings/${props.params.training_id}/offerings/${props.params.id}/assignments`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Offering',
  tabs: {
    items: [
      { label: 'Details', component: <Details offering={ resources.offering } /> },
      { label: 'Attendees', component: <Assignments assignments={ resources.assignments } /> }
    ]
  },
  tasks: {
    items: [
      { label: 'Edit Offering', modal: <Edit offering={ resources.offering } /> }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
