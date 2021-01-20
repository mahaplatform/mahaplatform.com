import PropTypes from 'prop-types'
import React from 'react'

class Quantity extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    variant: PropTypes.object
  }

  state = {
    quantity: 1
  }

  render() {
    const { quantity } = this.state
    return (
      <div className="store-product-quantity">
        <div className="store-product-quantity-control" onClick={ this._handleUpdate.bind(this, -1) }>-</div>
        <div className="store-product-quantity-value">{ quantity }</div>
        <div className="store-product-quantity-control" onClick={ this._handleUpdate.bind(this, 1) }>+</div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { quantity } = this.state
    if(quantity !== prevState.quantity) {
      this.props.onChange(quantity)
    }
  }

  _getBound(value) {
    const { variant } = this.props
    const newvalue = Math.max(1, value)
    if(variant.inventory_policy !== 'deny') return newvalue
    return Math.min(newvalue, variant.inventory_onhand)

  }

  _handleUpdate(increment) {
    const { quantity } = this.state
    this.setState({
      quantity: this._getBound(quantity + increment)
    })
  }

}

export default Quantity
