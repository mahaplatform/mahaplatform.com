import { Button, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ voicemail }) => {

  const items = [
    { label: 'Title', content: voicemail.contact.display_name }
  ]

  return <List items={ items } />

}

Details.propTypes = {
  voicemail: PropTypes.object
}

export default Details
