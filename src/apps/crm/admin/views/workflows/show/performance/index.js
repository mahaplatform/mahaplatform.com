import PropTypes from 'prop-types'
import { Menu } from 'maha-admin'
import React from 'react'

class Emails extends React.Component {

  static propTypes = {
    workflow: PropTypes.object
  }

  render() {
    return <Menu { ...this._getMenu() } />
  }

  _getMenu() {
    return {
      items: [
        { label: 'Enrollment', component: <div>Enrollment</div> },
        { label: 'Email', component: <div>Email</div> }
      ]
    }
  }

}
export default Emails
