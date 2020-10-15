import PropTypes from 'prop-types'
import React from 'react'

class CartIcon extends React.Component {

  static propTypes = {
    cart: PropTypes.object
  }

  state = {
    count: 0,
    animate: false
  }

  _handleChange = this._handleChange.bind(this)
  _handleClick = this._handleClick.bind(this)

  render() {
    const { count } = this.state
    return (
      <div className={ this._getClass()} onClick={ this._handleClick }>
        <i className="fa fa-shopping-cart" />
        { count > 0 &&
          <span className="store-carticon-count">
            { count }
          </span>
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.cart.on('change', this._handleChange)
    this.setState({
      count: this.props.cart.getCount()
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { count } = this.state
    if(count > prevState.count) {
      this._handleAnimate()
    }
  }

  _getClass() {
    const { animate } = this.state
    const classes = ['store-carticon']
    if(animate) classes.push('animating transition jiggle')
    return classes.join(' ')
  }

  _handleChange() {
    this.setState({
      count: this.props.cart.getCount()
    })
  }

  _handleClick() {
    this.props.cart.toggle()
  }

  _handleAnimate() {
    this.setState({ animate: true })
    setTimeout(() => {
      this.setState({ animate: false })
    }, 500)
  }

}

export default CartIcon
