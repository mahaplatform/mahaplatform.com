import PropTypes from 'prop-types'
import { Logo } from 'maha-admin'
import React from 'react'

class Program extends React.Component {

  static propTypes = {
    program: PropTypes.object
  }

  render() {
    const { program } = this.props
    return (
      <div className="maha-phone-call-header-program">
        <Logo team={ program } />
        <h4>{ program.title }</h4>
        <p>{ program.phone_number.formatted }</p>
      </div>
    )
  }

}

export default Program
