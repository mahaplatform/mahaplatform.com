import PropTypes from 'prop-types'
import { Logo } from '@admin'
import React from 'react'

class Program extends React.Component {

  static propTypes = {
    number: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    const { number, program } = this.props
    return (
      <div className="maha-phone-call-header-program">
        <Logo team={ program } />
        <h4>{ program.title }</h4>
        <p>{ number.formatted }</p>
      </div>
    )
  }

}

export default Program
