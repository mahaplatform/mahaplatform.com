import { Avatar } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class User extends React.Component {

  static propTypes = {
    user: PropTypes.object
  }

  render() {
    const { user } = this.props
    return (
      <div className="maha-phone-call-header-contact">
        <Avatar user={ user } />
        <h4>{ user.full_name }</h4>
        <p>{ user.email }</p>
      </div>
    )
  }

}

export default User
