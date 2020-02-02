import Recaptcha from './recaptcha'
import PropTypes from 'prop-types'
import Button from './button'
import Field from './field'
import React from 'react'

class Fields extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    config: PropTypes.object,
    data: PropTypes.object,
    errors: PropTypes.object,
    fields: PropTypes.array,
    human: PropTypes.bool,
    isOpen: PropTypes.bool,
    isReady: PropTypes.bool,
    isValid: PropTypes.bool,
    ready: PropTypes.array,
    requiresPayment: PropTypes.bool,
    status: PropTypes.string,
    token: PropTypes.string,
    validated: PropTypes.array,
    onChange: PropTypes.func,
    onPay: PropTypes.func,
    onSave: PropTypes.func,
    onSetHuman: PropTypes.func,
    onSetReady: PropTypes.func,
    onSetStatus: PropTypes.func,
    onSetValid: PropTypes.func,
    onValidate: PropTypes.func,
    onSubmit: PropTypes.func
  }

  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { config, fields } = this.props
    const { settings } = config
    return (
      <div className="maha-form-body">
        <div className="ui form">
          { fields.map((field, index) => (
            <Field key={`field_${index}`} { ...this._getField(field, index) } />
          )) }
          { settings.captcha &&
            <div className="maha-form-captcha">
              <Recaptcha { ...this._getRecaptcha() } />
            </div>
          }
          <div className="maha-form-submit">
            <Button { ... this._getButton() } />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { config } = this.props
    const { captcha } = config.settings
    if(!captcha) this.props.onSetHuman()
  }

  _getButton() {
    const { config, fields, human, requiresPayment, status } = this.props
    const { button_text, captcha } = config.settings
    const processing = status === 'submitting'
    return {
      color: 'blue',
      disabled: !human,
      label: requiresPayment ? 'Proceed to Payment' : button_text,
      processing,
      tabIndex: fields.length + (captcha ? 2 : 1),
      onClick: human && !processing ? this._handleValidate : () => {}
    }
  }

  _getField(field,index) {
    const { code, errors, status, token } = this.props
    return {
      code,
      field,
      index,
      error: errors[field.code],
      status,
      token,
      onChange: this._handleChange.bind(this, field.code),
      onReady: this._handleSetReady.bind(this, field.code),
      onValidate: this._handleSetValid.bind(this, field.code)
    }
  }

  _getRecaptcha() {
    const { fields, onSetHuman } = this.props
    return {
      tabIndex: fields.length + 1,
      onSuccess: onSetHuman
    }
  }

  _handleChange(code, value) {
    this.props.onChange(code, value)
  }

  _handleSetReady(code) {
    this.props.onSetReady(code)
  }

  _handleSetValid(code, value, error) {
    this.props.onSetValid(code, value, error)
  }

  _handleValidate() {
    this.props.onValidate()
  }

}

export default Fields
