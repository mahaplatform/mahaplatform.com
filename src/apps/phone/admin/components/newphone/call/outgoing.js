import PropTypes from 'prop-types'
import Header from './header'
import React from 'react'

class Outgoing extends React.Component {

  static propTypes = {
    call: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    const { call } = this.props
    return (
      <div className="maha-phone-call">
        <Header call={ call.call } />
        <div className="maha-phone-call-body">
          <div className="maha-phone-call-extra">
            { call.status}
          </div>
        </div>
      </div>
    )
  }

}

export default Outgoing
