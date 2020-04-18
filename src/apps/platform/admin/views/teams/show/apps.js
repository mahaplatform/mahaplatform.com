import { AppToken, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Apps = ({ apps }) => {

  const items = apps.map((app, index) => ({
    component: <AppToken { ...app } />,
    extra: app.installed ? <span className="red">INSTALLED</span> : null
  }))

  return <List items={ items } />

}

Apps.propTypes = {
  apps: PropTypes.array
}

export default Apps
