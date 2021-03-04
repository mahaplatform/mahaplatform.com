import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Range extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    min: 0,
    max: 100,
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    value: 0
  }

  _handleChange = _.throttle(this._handleChange.bind(this), 250)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { min, max } = this.props
    const { value } = this.state
    return (
      <div className="maha-range">
        <div className="maha-range-slider">
          <input { ...this._getRange() } />
        </div>
        <div className="maha-range-legend">
          <div className="maha-range-min">
            { min }
          </div>
          <div className="maha-range-value">
            { value }
          </div>
          <div className="maha-range-max">
            { max }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setState({
      value: defaultValue
    })
    onReady()
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
      value,
      onChange: this._handleUpdate,
      onInput: this._handleUpdate
    }
  }

  _handleChange() {
    const { value } = this.state
    this.props.onChange(value)
  }

  _handleUpdate(e) {
    this.setState({
      value: parseInt(e.target.value)
    })
  }

}

export default Range
