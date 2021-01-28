import PropTypes from 'prop-types'
import Button from '../button'
import Header from './header'
import React from 'react'

class Outgoing extends React.Component {

  static propTypes = {
    call: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    const { program } = this.props
    const { call } = this.props.call
    return (
      <div className="maha-phone-call">
        <Header program={ program } call={ call } />
        <div className="maha-phone-call-body">
        </div>
      </div>
    )
  }

}

export default Outgoing
