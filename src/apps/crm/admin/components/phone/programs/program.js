import PropTypes from 'prop-types'
import { Logo } from '@admin'
import React from 'react'

class Program extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    onClose: PropTypes.func
  }

  render() {
    const { program } = this.props
    return (
      <div className="maha-phone-program">
        <div className="maha-phone-program-logo">
          <Logo team={ program }/>
        </div>
        <div className="maha-phone-program-label">
          <strong>{ program.title }</strong><br/>
          <span>{ program.phone_number.formatted }</span>
        </div>
      </div>
    )
  }

}

export default Program
