import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class Price extends React.Component {

  static propTypes = {
    fixed_price: PropTypes.string,
    high_price: PropTypes.string,
    low_price: PropTypes.string,
    price_type: PropTypes.string,
    onChange: PropTypes.func
  }

  state = {
    selected: 0
  }

  render() {
    const { fixed_price, price_type } = this.props
    const values = this._getValues()
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
            { values.map((value, index) => (
              <div { ...this._getValue(index) } key={`value_${index}`}>
                { numeral(value).format('0.00') }
              </div>
            ))}
          </div>
        }
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state
    if(selected !== prevState.selected) {
      this._handleChange()
    }
  }

  _handleChange() {
    const values = this._getValues()
    const { selected } = this.state
    const value = values[selected]
    this.props.onChange(value)
  }

  _getClass(index) {
    const { selected } = this.state
    const classes = ['registration-price-option']
    if(index === selected) classes.push('selected')
    return classes.join(' ')
  }

  _getSteps(range) {
    if(_.includes([0,0.5], (range / 3) % 1)) return 4
    if(_.includes([0,0.5], (range / 2) % 1)) return 3
    return 2
  }

  _getValues() {
    const { high_price, low_price} = this.props
    const range = Number(high_price) - Number(low_price)
    const steps = this._getSteps(range)
    return new Array(steps).fill(0).map((i, j) => {
      return Number(low_price) + ((range / (steps - 1)) * j)
    })
  }

  _getValue(index) {
    return {
      className: this._getClass(index),
      onClick: this._handleChoose.bind(this, index)
    }
  }

  _handleChoose(selected) {
    this.setState({ selected })
  }

}

export default Price
