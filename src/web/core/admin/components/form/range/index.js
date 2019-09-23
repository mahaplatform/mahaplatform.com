import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Range extends React.Component {

  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {
    min: 0,
    max: 100,
    onChange: () => {}
  }

  state = {
    value: 0
  }

  _handleChange = _.throttle(this._handleChange.bind(this), 250)
  _handleInput = this._handleInput.bind(this)

  render() {
    return (
      <div className="maha-range">
        <input { ...this._getRange() } />
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getRange() {
    const { min, max } = this.props
    const { value } = this.state
    return {
      type: 'range',
      min,
      max,
      defaultValue: value,
      onInput: this._handleInput
    }
  }

  _handleChange() {
    const { value } = this.state
    this.props.onChange(value)
  }

  _handleInput(e) {
    this.setState({
      value: e.target.value
    })
  }

}

export default Range
