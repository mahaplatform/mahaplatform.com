import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const FLOAT_REGEX = /^-?[0-9]*\.?[0-9]*$/

const INTEGER_REGEX = /^-?[0-9]*$/

class NumberField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    maxLength: PropTypes.number,
    number_type: PropTypes.string,
    originalValue: PropTypes.any,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    tabIndex: PropTypes.number,
    units: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Enter an amount',
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    focused: false,
    value: ''
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleChange = _.throttle(this._handleChange.bind(this), 250, { trailing:  true })
  _handleClear = this._handleClear.bind(this)
  _handleFocus = this._handleFocus.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { units } = this.props
    const { value } = this.state
    return (
      <div className="maha-numberfield">
        <div className={ this._getClass() }>
          <div className="maha-input-field">
            <input { ...this._getInput() } />
          </div>
          { value !== null && value.length > 0 &&
            <div className="maha-input-clear" onClick={ this._handleClear }>
              <i className="fa fa-times" />
            </div>
          }
        </div>
        { units &&
          <div className="maha-numberfield-units">
            { units }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, originalValue, onReady } = this.props
    const value = originalValue || defaultValue
    if(!_.isNil(value)) this.setState({ value })
    onReady(this._handleValidate)
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getClass() {
    const { disabled } = this.props
    const classes = ['maha-input']
    if(disabled) classes.push('disabled')
    return classes.join(' ')
  }

  _getInput() {
    const { disabled, maxLength, placeholder, tabIndex } = this.props
    const { focused, value } = this.state
    return {
      disabled,
      className: 'ui input',
      type: 'textfield',
      maxLength,
      placeholder: !focused ? placeholder : null,
      tabIndex,
      value,
      onBlur: this._handleBlur,
      onChange: this._handleUpdate,
      onFocus: this._handleFocus
    }
  }

  _handleBlur() {
    this.setState({
      focused: false
    })
  }

  _handleChange() {
    const { value } = this.state
    const formatted = value > 0 ? Number(value) : null
    this.props.onChange(formatted)
  }

  _handleClear() {
    this.setState({
      value: ''
    })
  }

  _handleFocus() {
    this.setState({
      focused: true
    })
  }

  _handleUpdate(e) {
    const { number_type, maxLength } = this.props
    const value = e.target.value
    if(maxLength && value.length > maxLength) return
    const regex = number_type === 'integer' ? INTEGER_REGEX : FLOAT_REGEX
    if(!value.match(regex)) return
    this.setState({ value })
  }

  _handleValidate() {
    const { min, max, required, onValid } = this.props
    const { value } = this.state
    if(required === true && value === '') return onValid(value, ['This field is required'])
    if(min !== undefined && Number(value) < min) return onValid(value, [`This field must be greater than or equal to  ${min}`])
    if(max !== undefined && Number(value) > max) return onValid(value, [`This field must be less than or equal to ${max}`])
    onValid(value.length ? value : null)
  }

}

export default NumberField
