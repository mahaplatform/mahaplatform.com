import Recaptcha from './recaptcha'
import PropTypes from 'prop-types'
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
    status: PropTypes.object,
    onChange: PropTypes.func,
    onPay: PropTypes.func,
    onSave: PropTypes.func,
    onSetAllStatus: PropTypes.func,
    onSetHuman: PropTypes.func,
    onSetReady: PropTypes.func,
    onSetStatus: PropTypes.func,
    onSetValidate: PropTypes.func,
    onValidate: PropTypes.func,
    onSubmit: PropTypes.func
  }

  _handleValidate = this._handleValidate.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

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
            <Recaptcha { ...this._getRecaptcha() } />
          }
          <button { ...this._getButton()}>
            { settings.submit_text }
          </button>
        </div>
      </div>
    )
  }

  _getButton() {
    const { human } = this.props
    return {
      className: human ? 'ui blue button' : 'ui blue disabled button',
      onClick: human ? this._handleValidate : () => {}
    }
  }

  _getField(field,index) {
    const { errors, status } = this.props
    return {
      field,
      index,
      error: errors[field.name],
      status: status[field.name],
      onChange: this._handleChange.bind(this, field.name),
      onReady: this._handleSetReady.bind(this, field.name),
      onValidate: this._handleSetValidate.bind(this, field.name)
    }
  }

  _getRecaptcha() {
    const { onSetHuman } = this.props
    return {
      onSuccess: onSetHuman
    }
  }

  _handleChange(name, value) {
    this.props.onChange(name, value)
  }

  _handleSetReady(name) {
    this.props.onSetReady(name)
  }

  onSetStatus(name, status) {
    this.props.onSetStatus(name, status)
  }

  _handleSetValidate(name, status, error) {
    this.props.onSetValidate(name, status, error)
  }

  _handleValidate() {
    this.props.onSetAllStatus('validating')
  }

  _handleSubmit() {
    const { finalized } = this.props
  }

}

export default Fields
