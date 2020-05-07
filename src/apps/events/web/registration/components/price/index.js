import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Price extends React.Component {

  static propTypes = {
    fixed_price: PropTypes.string,
    high_price: PropTypes.string,
    low_price: PropTypes.string,
    price_type: PropTypes.string,
    onChange: PropTypes.func
  }

  state = {
    focused: false,
    sliding_scale: ''
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleSlidingScale = this._handleSlidingScale.bind(this)
  _handleFocus = this._handleFocus.bind(this)

  render() {
    const { fixed_price, price_type } = this.props
    return (
      <div className="registration-price">
        { price_type === 'free' &&
          <div className="registration-price-value">
            FREE
          </div>
        }
        { price_type === 'fixed' &&
          <div className="registration-price-value">
            { numeral(fixed_price).format('0.00') }
          </div>
        }
        { price_type === 'sliding_scale' &&
          <div className="registration-price-options">
            <input { ...this._getSlidingScale() } />
          </div>
        }
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { sliding_scale } = this.state
    if(sliding_scale !== prevState.sliding_scale) {
      this._handleChange()
    }
  }

  _getClass(index) {
    const { selected } = this.state
    const classes = ['registration-price-option']
    if(index === selected) classes.push('selected')
    return classes.join(' ')
  }

  _getSlidingScale() {
    const { sliding_scale } = this.state
    return {
      placeholder: 'Enter price',
      value: sliding_scale,
      onBlur: this._handleBlur,
      onChange: this._handleSlidingScale,
      onFocus: this._handleFocus
    }
  }

  _handleBlur() {
    const { sliding_scale } = this.state
    this.setState({
      focused: false,
      sliding_scale: sliding_scale.length > 0 ? numeral(sliding_scale).format('0.00') : sliding_scale
    })
  }

  _handleChange() {
    const { sliding_scale } = this.state
    this.props.onChange(sliding_scale)
  }

  _handleChoose(selected) {
    this.setState({ selected })
  }

  _handleFocus() {
    this.setState({
      focused: true
    })
  }

  _handleSlidingScale(e) {
    const sliding_scale = e.target.value
    if(!sliding_scale.match(/^-?\d*\.?\d{0,2}$/)) return
    this.setState({ sliding_scale })
  }

}

export default Price
