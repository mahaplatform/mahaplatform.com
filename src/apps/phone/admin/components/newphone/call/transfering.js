import Contact from './header/contact'
import User from './header/user'
import PropTypes from 'prop-types'
import React from 'react'

class Transfering extends React.Component {

  static contextTypes = {
    network: PropTypes.object,
    phone: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  render() {
    const { call } = this.props
    return (
      <div className="maha-phone-call">
        <div className="maha-phone-call-header">
          <Contact contact={ call.call.contact } number={ call.call.phone_number } />
          <div className="maha-phone-call-header-link">
            <i className="fa fa-arrow-right" />
          </div>
          { call.transfering.user &&
            <User user={ call.transfering.user } />
          }
          { call.transfering.number &&
            <div>{ call.transfering.number }</div>
          }
        </div>
        <p>{ call.status }</p>
      </div>
    )
  }

}

export default Transfering
