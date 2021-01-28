import PropTypes from 'prop-types'
import Program from './program'
import Contact from './contact'
import React from 'react'

class Header extends React.Component {

  static propTypes = {
    call: PropTypes.object
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
    const { call } = this.props
    const { contact, direction, from, program } = call
    if(direction === 'inbound') {
      return <Contact contact={ contact } number={ from } />
    }
    if(direction === 'outbound') {
      return <Program program={ program } number={ from } />
    }
  }

  _getTo() {
    const { call } = this.props
    const { contact, direction, to, program } = call
    if(direction === 'inbound') {
      return <Program program={ program } number={ to } />
    }
    if(direction === 'outbound') {
      return <Contact contact={ contact } number={ to } />
    }
  }

}

export default Header
