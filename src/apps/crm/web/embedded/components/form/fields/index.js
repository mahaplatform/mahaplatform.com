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
    status: PropTypes.string,
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
    const { config, fields, status } = this.props
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
          { status === 'submitting' ?
            <div { ...this._getButton()}>
              <i className="fa fa-circle-o-notch fa-spin fa-fw" /> Submitting
            </div> :
            <div { ...this._getButton()}>
              { settings.submit_text }
            </div>
          }
        </div>
      </div>
    )
  }

  _getButton() {
    const { human, status } = this.props
    const submitting = status === 'submitting'
    return {
      className: human && !submitting ? 'ui blue button' : 'ui blue disabled button',
      onClick: human && !submitting ? this._handleValidate : () => {}
    }
  }

  _getField(field,index) {
    const { errors, status } = this.props
    return {
      field,
      index,
      error: errors[field.name],
      status,
      onChange: this._handleChange.bind(this, field.name),
      onReady: this._handleSetReady.bind(this, field.name),
      onValidate: this._handleSetValid.bind(this, field.name)
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

  _handleSetValid(name, value, error) {
    this.props.onSetValid(name, value, error)
  }

  _handleValidate() {
    this.props.onValidate()
  }

}

export default Fields
