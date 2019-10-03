import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import moment from 'moment'
import React from 'react'

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

export default Details
