import { Submit, Recaptcha } from '@client'
import PropTypes from 'prop-types'
import Field from './field'
import React from 'react'
import _ from 'lodash'

class Fields extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    config: PropTypes.object,
    data: PropTypes.object,
    errors: PropTypes.object,
    fields: PropTypes.array,
    human: PropTypes.bool,
    ipaddress: PropTypes.string,
    isOpen: PropTypes.bool,
    isReady: PropTypes.bool,
    isValid: PropTypes.bool,
    params: PropTypes.object,
    ready: PropTypes.array,
    referer: PropTypes.string,
    requiresPayment: PropTypes.bool,
    starttime: PropTypes.number,
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
    const fields = this._getFields()
    const { config } = this.props
    const { security } = config
    return (
      <div className="maha-form-body">
        <div className="ui form">
          { fields.map((field, index) => (
            <Field key={`field_${field.code}`} { ...this._getField(field, index) } />
          )) }
          { security.captcha &&
            <div className="maha-form-captcha">
              <Recaptcha { ...this._getRecaptcha() } />
            </div>
          }
          <div className="maha-form-submit">
            <Submit { ... this._getSubmit() } />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { config } = this.props
    const { captcha } = config.security
    if(!captcha) this.props.onSetHuman()
  }

  _getFields() {
    const { fields, ipaddress, referer, starttime } = this.props
    return [
      { type: 'hidden', code: 'referer', value: referer },
      { type: 'hidden', code: 'starttime', value: starttime },
      { type: 'hidden', code: 'ipaddress', value: ipaddress },
      ...fields
    ]
  }

  _getDefaultValue(field) {
    const { params } = this.props
    if(params[field.code]) return params[field.code]
    const token = _.get(field, 'name.token')
    return params[token] || field.defaultValue
  }

  _getField(field, index) {
    const { code, errors, status, token } = this.props
    return {
      code,
      defaultValue: this._getDefaultValue(field),
      field,
      index,
      error: errors[field.code],
      status,
      token,
      tokens: this._getTokens(),
      onChange: this._handleChange.bind(this, field.code),
      onReady: this._handleSetReady.bind(this, field.code),
      onValidate: this._handleSetValid.bind(this, field.code)
    }
  }

  _getRecaptcha() {
    const { onSetHuman } = this.props
    const fields = this._getFields()
    return {
      tabIndex: fields.length + 1,
      onSuccess: onSetHuman
    }
  }

  _getSubmit() {
    const { config, human, requiresPayment, status } = this.props
    const { captcha } = config.security
    const { button_text } = config.body
    const processing = status === 'submitting'
    const fields = this._getFields()
    return {
      color: 'blue',
      disabled: !human,
      label: requiresPayment ? 'Proceed to Payment' : button_text,
      processing,
      tabIndex: fields.length + (captcha ? 2 : 1),
      onClick: human && !processing ? this._handleValidate : () => {}
    }
  }

  _getTokens() {
    const { data, fields } = this.props
    return fields.filter(field => {
      return field.type !== 'text'
    }).reduce((tokens, field) => {
      return {
        ...tokens,
        [field.name.token]: data[field.code]
      }
    }, {})
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
