import Recaptcha from './recaptcha'
import PropTypes from 'prop-types'
import Field from './field'
import React from 'react'

class Fields extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    data: PropTypes.object,
    errors: PropTypes.object,
    fields: PropTypes.array,
    finalized: PropTypes.object,
    isFinalized: PropTypes.bool,
    human: PropTypes.bool,
    isReady: PropTypes.bool,
    isValid: PropTypes.bool,
    requiresPayment: PropTypes.bool,
    status: PropTypes.object,
    onChange: PropTypes.func,
    onSave: PropTypes.func,
    onSetAllStatus: PropTypes.func,
    onSetHuman: PropTypes.func,
    onSetStatus: PropTypes.func,
    onSetValidate: PropTypes.func
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
      onReady: this.onSetStatus.bind(this, field.name, 'ready'),
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
