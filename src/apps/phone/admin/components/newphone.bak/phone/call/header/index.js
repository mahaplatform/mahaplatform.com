import PropTypes from 'prop-types'
import Program from './program'
import Contact from './contact'
import User from './user'
import React from 'react'

class Header extends React.Component {

  static propTypes = {
    call: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    return (
      <div className="maha-phone-call-header">
        { this._getFrom() }
        <div className="maha-phone-call-header-link">
          <i className="fa fa-arrow-right" />
        </div>
        { this._getTo() }
      </div>
    )
  }

  _getFrom() {
    const { call, program } = this.props
    const { contact, direction, from, from_user } = call
    if(direction === 'inbound' && from_user) {
      return <User user={ from_user } />
    }
    if( direction === 'inbound' && contact) {
      return <Contact contact={ contact } from={ from }/>
    }
    if(direction === 'outbound' && from_user) {
      return <User user={ from_user } />
    }
    if(direction === 'outbound' && program) {
      return   <Program program={ program } />
    }
  }

  _getTo() {
    const { call, program } = this.props
    const { contact, direction, from, to, to_user } = call
    if(direction === 'inbound' && program) {
      return <Program program={ program } />
    }
    if(direction === 'outbound' && contact) {
      return <Contact contact={ contact } from={ from } />
    }
    if(to_user) {
      return <User user={ to_user } to={ to } />
    }
  }

}

export default Header
