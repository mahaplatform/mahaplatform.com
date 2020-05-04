import PropTypes from 'prop-types'
import React from 'react'

const ListToken = ({ title, contacts_count }) => (
  <div className="token">
    { title } ({ contacts_count } contacts)
  </div>
)

ListToken.propTypes = {
  title: PropTypes.string,
  contacts_count: PropTypes.number
}

export default ListToken
