import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Ringing extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  static propTypes = {}

  _handlePickup = this._handlePickup.bind(this)

  render() {
    return (
      <div className="maha-phone-client-body">
        <Button { ...this._getPickup() } />
      </div>
    )
  }

  _getPickup() {
    return {
      label: 'Pickup',
      className: 'link',
      handler: this._handlePickup
    }
  }

  _handlePickup() {
    this.context.phone.pickup()
  }

}

export default Ringing
