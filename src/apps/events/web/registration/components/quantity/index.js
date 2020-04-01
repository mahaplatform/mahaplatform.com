import PropTypes from 'prop-types'
import React from 'react'

class Quantity extends React.Component {

  static propTypes = {}

  state = {
    value: 0
  }

  render() {
    const { value } = this.state
    return (
      <div className="registration-quantity">
        <div className="registration-quantity-action" onClick={ this._handleAdjust.bind(this, -1) }>
          <i className="fa fa-minus" />
        </div>
        <div className="registration-quantity-value">
          { value }
        </div>
        <div className="registration-quantity-action" onClick={ this._handleAdjust.bind(this, 1) }>
          <i className="fa fa-plus" />
        </div>
      </div>
    )
  }

  _handleAdjust(increment) {
    this.setState({
      value: this.state.value + increment
    })
  }

}

export default Quantity
