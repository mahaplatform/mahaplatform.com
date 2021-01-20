import PropTypes from 'prop-types'
import React from 'react'

class Quantity extends React.Component {

  static contextTypes = {
    analytics: PropTypes.object
  }

  static propTypes = {
    disabled: PropTypes.bool,
    max: PropTypes.number,
    ticket_type: PropTypes.object,
    quantity: PropTypes.number,
    onChange: PropTypes.func
  }

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

  componentDidUpdate(prevProps, prevState) {
    const { quantity } = this.props
    const { value } = this.state
    if(quantity !== prevProps.quantity) {
      this.setState({ value: quantity })
    }
    if(value !== prevState.value) {
      this.props.onChange(value)
    }
  }

  _getAdjusted(value) {
    const { max } = this.props
    const adjusted = Math.max(0, value)
    return max ? Math.min(max, adjusted) : adjusted
  }

  _handleAdjust(increment) {
    const { disabled } = this.props
    if(disabled) return true
    this.setState({
      value: this._getAdjusted(this.state.value + increment)
    })
    this._handleTrack(increment)
  }

  _handleTrack(increment) {
    const { price, ticket_type } = this.props
    const { analytics } = this.context
    if(increment > 0) return analytics.trackAddToCart(ticket_type.code, ticket_type.name, null, price, increment, 'USD')
    analytics.trackRemoveFromCart(ticket_type.code, ticket_type.name, null, price, increment, 'USD')
  }

}

export default Quantity
