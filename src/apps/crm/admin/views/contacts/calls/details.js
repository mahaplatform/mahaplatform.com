import { Comments, List } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const getTimestamp = (call) => {
  const today = moment().startOf('day')
  const yesterday = moment().subtract(1, 'day').startOf('day')
  const created_at = moment(call.created_at)
  if(today.format('YYMMDD') === created_at.format('YYMMDD')) return 'Today'
  if(yesterday.format('YYMMDD') === created_at.format('YYMMDD')) return 'Yesterday'
  if(today.diff(created_at, 'days') < 7) return created_at.format('dddd')
  return created_at.format('MM/DD/YY')
}

const getDuration = (duration) => {
  if(duration < 60) return `${duration} seconds`
  return `${Math.floor(duration / 60)} minutes`
}

const Details = ({ call }) => {

  const list = {
    items: [
      { label: 'Contact', content: call.contact.full_name },
      { label: 'Date', content: getTimestamp(call) },
      { label: 'Time', content: moment(call.created_at).format('h:mmA') },
      { label: 'Duration', content: getDuration(call.duration) },
      { label: 'Direction', content: call.direction },
      { label: 'From', content: call.from.number },
      { label: 'To', content: call.to.number }
    ],
    footer: <Comments entity={`maha_calls/${call.id}`} />
  }

  return <List { ...list } />

}

Details.propTypes = {
  call: PropTypes.object
}

export default Details
