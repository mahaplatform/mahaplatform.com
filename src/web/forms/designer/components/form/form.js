import Recaptcha from './recaptcha'
import PropTypes from 'prop-types'
import Field from './field'
import React from 'react'

class Form extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    fields: PropTypes.array,
    finalized: PropTypes.object,
    isFinalized: PropTypes.bool,
    human: PropTypes.bool,
    isReady: PropTypes.bool,
    isValid: PropTypes.bool,
    status: PropTypes.object,
    onChange: PropTypes.func,
    onSave: PropTypes.func,
    onSetAllStatus: PropTypes.func,
    onSetFinalized: PropTypes.func,
    onSetHuman: PropTypes.func,
    onSetStatus: PropTypes.func,
    onSetValidate: PropTypes.func
  }

  _handleValidate = this._handleValidate.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { fields } = this.props
    return (
      <div className="maha-form-fields">
        <div className="ui form">
          { fields.map((field, index) => (
            <Field key={`field_${index}`} { ...this._getField(field) } />
          )) }
          <Recaptcha { ...this._getRecaptcha() } />
          <button { ...this._getButton()}>Submit</button>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { isFinalized, isValid, isReady } = this.props
    if(isFinalized !== prevProps.isFinalized && isFinalized) {
      this._handleSubmit()
    }
    if(isValid !== prevProps.isValid && isValid) {
      this.props.onSetAllStatus('finalizing')
    }
    if(isReady !== prevProps.isReady && isReady) {
      console.log('ready')
    }
  }

  _getButton() {
    const { human } = this.props
    return {
      className: human ? 'ui blue button' : 'ui blue disabled button',
      onClick: human ? this._handleValidate : () => {}
    }
  }

  _getField(field) {
    const { errors, status } = this.props
    return {
      field,
      error: errors[field.name],
      status: status[field.name],
      onChange: this._handleChange.bind(this, field.name),
      onReady: this.onSetStatus.bind(this, field.name, 'ready'),
      onValidate: this._handleSetValidate.bind(this, field.name),
      onFinalize: this._handleSetFinalized.bind(this, field.name)
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

  _handleFinalize() {

  }

  onSetStatus(name, status) {
    this.props.onSetStatus(name, status)
  }

  _handleSetFinalized(name, value) {
    this.props.onSetFinalized(name, value)
  }

  _handleSetValidate(name, status, error) {
    this.props.onSetValidate(name, status, error)
  }

  _handleValidate() {
    this.props.onSetAllStatus('validating')
  }

  _handleSubmit() {
    const { finalized } = this.props
    console.log('submit', finalized)
  }

}

export default Form
