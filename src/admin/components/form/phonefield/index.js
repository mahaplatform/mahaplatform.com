import parsePhoneNumber, { AsYouType } from 'libphonenumber-js'
import PropTypes from 'prop-types'
import React from 'react'

class PhoneField extends React.Component {

  static propTypes = {
    defaultCountry: PropTypes.string,
    defaultValue: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    defaultCountry: 'US',
    onChange: () => {},
    onReady: () => {}
  }

  phone = null

  state = {
    value: ''
  }

  _handleClear = this._handleClear.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

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
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setState({ value: defaultValue })
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.value !== prevState.value) {
      this._handleChange()
    }
  }

  _handleChange() {
    const { value } = this.state
    const parsed = parsePhoneNumber(value, 'US')
    if(!(parsed && parsed.isValid())) return
    this.props.onChange(parsed.number)
  }

  _getInput() {
    const { tabIndex } = this.props
    const { value } = this.state
    return {
      className: 'ui input',
      type: 'tel',
      placeholder: 'Enter phone number',
      tabIndex,
      value,
      ref: node => this.phone = node,
      onChange: this._handleUpdate
    }
  }

  _handleUpdate() {
    const asyoutype = new AsYouType(this.props.defaultCountry)
    const parsed = asyoutype.input(this.phone.value)
    this.setState({
      value: parsed
    })
  }

  _handleClear() {
    this.setState({
      value: ''
    })
  }

}

export default PhoneField
