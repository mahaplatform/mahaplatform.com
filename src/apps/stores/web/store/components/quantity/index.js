import PropTypes from 'prop-types'
import React from 'react'

class Quantity extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    max: PropTypes.number
  }

  static defaultProps = {
    max: 100
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

  _handleUpdate(increment) {
    const { max } = this.props
    const { quantity } = this.state
    this.setState({
      quantity: Math.min(Math.max(1, quantity + increment), max)
    })
  }

}

export default Quantity
