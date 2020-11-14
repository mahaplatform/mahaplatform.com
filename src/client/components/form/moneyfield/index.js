import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class MoneyField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.number,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    htmlFor: PropTypes.string,
    placeholder: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    required: PropTypes.bool,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    placeholder: '0.00',
    onChange: () => {},
    onReady: () => {}
  }

  input = null

  state = {
    focused: false,
    value: 0
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleChange = _.throttle(this._handleChange.bind(this), 250, { trailing:  true })
  _handleReset = this._handleReset.bind(this)
  _handleFocus = this._handleFocus.bind(this)
  _handleKeyDown = this._handleKeyDown.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className={ this._getClass() }>
        <div className="maha-input-field">
          <input { ...this._getInput() } />
        </div>
        { value > 0 &&
          <div className="maha-input-clear" onClick={ this._handleReset }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(!_.isNil(defaultValue)) this.setState({
      value: defaultValue
    })
    onReady(this._handleValidate)
  }

  componentDidUpdate(prevProps, prevState) {
    const { status } = this.props
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _getClass() {
    const { focused } = this.state
    const { disabled } = this.props
    const classes = ['maha-input','maha-moneyfield']
    if(disabled) classes.push('disabled')
    if(focused) classes.push('focused')
    return classes.join(' ')
  }

  _getFormatted() {
    const { value } = this.state
    return numeral(value / 100).format('$0,0.00')
  }

  _getInput() {
    const { htmlFor, placeholder, tabIndex } = this.props
    const { focused } = this.state
    return {
      id: htmlFor,
      type: 'text',
      placeholder: !focused ? placeholder : null,
      ref: node => this.input = node,
      tabIndex,
      value: this._getFormatted(),
      onBlur: this._handleBlur,
      onKeyDown: this._handleKeyDown,
      // onChange: this._handleUpdate,
      onFocus: this._handleFocus
    }
  }

  _getValue(key, which) {
    const { value } = this.state
    if(which === 8) return Math.floor(value / 10)
    const newvalue = (value * 10) + parseInt(key)
    return newvalue > 100000000 ? value : newvalue
  }

  _handleBlur() {
    this.setState({
      focused: false
    })
  }

  _handleChange() {
    this.props.onChange(Number(this.state.value))
  }

  _handleFocus() {
    this.setState({
      focused: true
    })
  }

  _handleKeyDown(e) {
    if(e.which !== 8 && !/\d/.test(e.key)) e.preventDefault()
    this.setState({
      value: this._getValue(e.key, e.which)
    })
  }

  _handleReset() {
    this.setState({
      value: 0
    })
    this.input.focus()
  }

  _handleUpdate(e) {
    const value = e.target.value
    if(!value.match(/^-?\d*\.?\d{0,2}$/)) return
    this.setState({ value })
  }

  _handleValidate() {
    const { min, max, required, onValidate } = this.props
    const { value } = this.state
    if(required === true && value === '') return onValidate(value, ['This field is required'])
    if(min !== undefined && Number(value) < min) return onValidate(value, [`This field must be greater than or equal to  ${min}`])
    if(max !== undefined && Number(value) > max) return onValidate(value, [`This field must be less than or equal to ${max}`])
    onValidate(value)
  }

}

export default MoneyField
