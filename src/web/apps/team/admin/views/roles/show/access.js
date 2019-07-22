import { AppToken, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Access = ({ access }) => {

  const sections = access.map((app, appindex) => ({
    content: !app.installed ? 'This role doesn\'t have access to this app' : null,
    empty: app.installed ? 'This app doesn\'t have any rights' : null,
    items: app.installed ? app.rights.map((right, rightindex) => ({
      icon: right.assigned ? 'check' : 'time',
      content: <span><strong>{ right.title }</strong><br />{ right.description }</span>
    })) : [],
    title: <AppToken { ...app } />
  }))

  return <List className="app-access" sections={ sections } />

}

Access.propTypes = {
  access: PropTypes.array
}

export default Access
