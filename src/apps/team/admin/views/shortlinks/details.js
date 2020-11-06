import PropTypes from 'prop-types'
import { List } from '@admin'
import React from 'react'

const Details = ({ shortlink }) => {

  const config = {
    items: [
      { label: 'Code', content: shortlink.code },
      { label: 'Short URL', content: shortlink.shortUrl },
      { label: 'URL', content: shortlink.url }
    ]
  }

  return <List { ...config } />

}

Details.propTypes = {
  shortlink: PropTypes.object
}

export default Details
