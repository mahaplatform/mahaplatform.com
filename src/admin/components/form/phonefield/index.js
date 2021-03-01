import parsePhoneNumber from 'libphonenumber-js'
import PropTypes from 'prop-types'
import React from 'react'

class PhoneField extends React.Component {

  static propTypes = {
    defaultCountry: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    defaultCountry: 'US',
    placeholder: 'Enter Phone Number',
    onChange: () => {},
    onReady: () => {}
  }

  input = null

  state = {
    value: ''
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-input">
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
    const { defaultValue } = this.props
    if(defaultValue) this.setState({
      value: this._getParsed(defaultValue)
    })
    this.props.onReady(this._handleValidate)
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.value !== prevState.value) {
      this._handleChange()
    }
  }

  _getFormatted() {
    const { defaultCountry } = this.props
    const value = this.state.value.trim()
    const parsed = parsePhoneNumber(value, defaultCountry)
    if(!parsed || !parsed.isValid()) return value
    const formatted = parsed.number.match(/^\+1(\d{3})(\d{3})(\d{4})/).slice(1,4).join('-')
    return parsed.ext ? `${formatted} ext. ${parsed.ext}` : formatted
  }

  _getInput() {
    const { placeholder, tabIndex } = this.props
    const { value } = this.state
    return {
      ref: node => this.phone = node,
      className: 'ui input',
      type: 'tel',
      placeholder,
      tabIndex,
      value,
      onBlur: this._handleBlur,
      onChange: this._handleUpdate
    }
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

  _handleBlur(e) {
    const value = this._getFormatted()
    this.setState({ value })
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

  _handleUpdate(e) {
    const value = e.target.value
    this.setState({ value })
  }

  _handleValidate() {
    const { value } = this.state
    const { defaultCountry, required } = this.props
    if(required && (!value || value.length === 0)) {
      return this.props.onValid(null, ['field is required'])
    }
    if(!required && !value) return this.props.onValid(raw)
    const parsed = parsePhoneNumber(value, defaultCountry)
    if(!parsed || !parsed.isValid()) {
      return this.props.onValid(null, ['invalid phone format'])
    }
    const raw = this._getRaw()
    this.props.onValid(raw)
  }

}

export default PhoneField
