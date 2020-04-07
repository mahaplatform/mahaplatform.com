import { Button } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class Door extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    data: PropTypes.object,
    endpoint: PropTypes.string,
    token: PropTypes.string,
    onNext: PropTypes.func
  }

  render() {
    return (
      <div className="maha-payment-door">
        <Button { ...this._getButton() } />
      </div>
    )
  }

  _getButton() {
    const { onNext } = this.props
    return {
      label: 'Next',
      color: 'blue',
      handler: onNext
    }
  }

}

export default Door
