import PropTypes from 'prop-types'
import React from 'react'

const appToken = ({ color, icon, title }) => (
  <div className="maha-app-token">
    <div className={ `maha-app-token-icon ${color}` }>
      <i className={ `fa fa-fw fa-${icon}` } />
    </div>
    { title }
  </div>
)

appToken.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string
}

export default appToken
