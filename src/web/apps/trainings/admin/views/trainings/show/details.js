import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ training }) => {

  const list = {}

  list.items = [
    { label: 'Title', content: training.title },
    { label: 'Description', content: training.description }
  ]

  if(training.url) {
    list.items.push({ label: 'URL', content: <a href={ training.url } target="_blank">{ training.url }</a> })
  }
  if(training.location) {
    list.items.push({ label: 'Location', content: training.location })
  }
  if(training.contact) {
    list.items.push({ label: 'Contact', content: training.contact })
  }


  return <List { ...list } />

}

Details.propTypes = {
  training: PropTypes.object
}

export default Details
