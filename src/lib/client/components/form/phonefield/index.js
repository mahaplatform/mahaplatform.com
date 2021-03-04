import parsePhoneNumber from 'libphonenumber-js'
import PropTypes from 'prop-types'
import React from 'react'

class PhoneField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultCountry: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.string,
    htmlFor: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    defaultCountry: 'US',
    onChange: () => {},
    onReady: () => {}
  }

  phone = null

  state = {
    focused: false,
    value: ''
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleFocus = this._handleFocus.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className={ this._getClass() }>
        <div className="maha-input-field">
          <input { ...this._getInput() }/>
        </div>
        { value && value.length > 0 &&
          <div className="maha-input-clear" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setState({
      value: this._getParsed(defaultValue)
    })
    onReady()
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
    const classes = ['maha-phonefield','maha-input']
    if(disabled) classes.push('disabled')
    if(focused) classes.push('focused')
    return classes.join(' ')
  }

  _getFormatted() {
    const { defaultCountry } = this.props
    const value = this.state.value.trim()
    const parsed = parsePhoneNumber(value, defaultCountry)
    if(!parsed || !parsed.isValid()) return value
    const formatted = parsed.number.match(/^\+1(\d{3})(\d{3})(\d{4})/).slice(1,4).join('-')
    return parsed.ext ? `${formatted} ext. ${parsed.ext}` : formatted
  }

  _getParsed(value) {
    const { defaultCountry } = this.props
    const parsed = parsePhoneNumber(value, defaultCountry)
    const formatted = parsed.number.match(/^\+1(\d{3})(\d{3})(\d{4})/).slice(1,4).join('-')
    return parsed.ext ? `${formatted} ext. ${parsed.ext}` : formatted
  }

  _getRaw() {
    const { defaultCountry } = this.props
    const { value } = this.state
    const parsed = parsePhoneNumber(value, defaultCountry)
    if(!parsed || !parsed.isValid()) return value
    return parsed.format('RFC3966').substr(4)
  }

  _getInput() {
    const { htmlFor, placeholder, tabIndex } = this.props
    const { focused, value } = this.state
    return {
      id: htmlFor,
      className: 'ui input',
      type: 'tel',
      placeholder: !focused ? placeholder : null,
      ref: node => this.phone = node,
      tabIndex,
      value,
      onBlur: this._handleBlur,
      onChange: this._handleUpdate,
      onFocus: this._handleFocus
    }
  }

  _handleBlur() {
    this.setState({
      focused: false,
      value: this._getFormatted()
    })
  }

  _handleChange() {
    const raw = this._getRaw()
    this.props.onChange(raw)
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
    const value = e.target.value
    this.setState({ value })
  }

  _handleValidate() {
    const { value } = this.state
    const { defaultCountry, required } = this.props
    if(required && (!value || value.length === 0)) {
      return this.props.onValidate(null, ['You must enter a value'])
    }
    const parsed = parsePhoneNumber(value, defaultCountry)
    if(!parsed || !parsed.isValid()) {
      return this.props.onValidate(null, ['You must enter a valid phone format'])
    }
    const raw = this._getRaw()
    this.props.onValidate(raw)
  }

}

export default PhoneField
