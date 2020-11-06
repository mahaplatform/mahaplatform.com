import Recaptcha from './recaptcha'
import PropTypes from 'prop-types'
import Submit from './submit'
import Field from './field'
import React from 'react'

class Form extends React.Component {

  static propTypes = {
    button: PropTypes.bool,
    captcha: PropTypes.bool,
    code: PropTypes.string,
    data: PropTypes.object,
    endpoint: PropTypes.string,
    errors: PropTypes.object,
    fields: PropTypes.array,
    human: PropTypes.bool,
    isActive: PropTypes.bool,
    isReady: PropTypes.bool,
    isValid: PropTypes.bool,
    method: PropTypes.string,
    ready: PropTypes.array,
    reference: PropTypes.func,
    submittable: PropTypes.array,
    submitText: PropTypes.string,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    token: PropTypes.string,
    validated: PropTypes.array,
    onChange: PropTypes.func,
    onFailure: PropTypes.func,
    onSetHuman: PropTypes.func,
    onSetReady: PropTypes.func,
    onSetStatus: PropTypes.func,
    onSetValid: PropTypes.func,
    onValidate: PropTypes.func,
    onSubmit: PropTypes.func,
    onSubmitForm: PropTypes.func,
    onSuccess: PropTypes.func
  }

  static defaultProps = {
    button: true,
    captcha: true,
    reference: () => {},
    tabIndex: 0,
    submitText: 'Submit',
    onFailure: () => {},
    onSuccess: () => {}
  }

  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { button, captcha, fields } = this.props
    return (
      <div className="ui form">
        <div className="maha-form-fields">
          { fields.map((field, index) => (
            <Field key={`field_${index}`} { ...this._getField(field, index) } />
          )) }
        </div>
        { captcha &&
          <div className="maha-form-captcha">
            <Recaptcha { ...this._getRecaptcha() } />
          </div>
        }
        { button &&
          <div className="maha-form-submit">
            <Submit { ... this._getSubmit() } />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { captcha, reference } = this.props
    if(!captcha) this.props.onSetHuman()
    if(reference) reference({
      submit: this._handleValidate
    })
  }

  componentDidUpdate(prevProps) {
    const { isValid, status } = this.props
    if(isValid !== prevProps.isValid && isValid) {
      this._handleSubmit()
    }
    if(status !== prevProps.status) {
      if(status === 'failure') this._handleFailure()
      if(status === 'success') this._handleSuccess()
    }
  }

  _getSubmit() {
    const { captcha, fields, human, status, submitText } = this.props
    const processing = status === 'submitting'
    return {
      color: 'blue',
      disabled: !human,
      label: submitText,
      processing,
      tabIndex: fields.length + (captcha ? 2 : 1),
      onClick: human && !processing ? this._handleValidate : () => {}
    }
  }

  _handleFailure() {
    this.props.onFailure()
  }

  _getField(field, index) {
    const { code, errors, status, tabIndex, token, onChange, onSetReady, onSetValid } = this.props
    return {
      code,
      field,
      index,
      errors,
      status,
      tabIndex: tabIndex + index + 1,
      token,
      onChange,
      onSetReady,
      onSetValid
    }
  }

  _getRecaptcha() {
    const { fields, onSetHuman } = this.props
    return {
      tabIndex: fields.length + 1,
      onSuccess: onSetHuman
    }
  }

  _handleSubmit() {
    const { endpoint, method, data, token, onSetStatus, onSubmit, onSubmitForm } = this.props
    if(endpoint) return onSubmitForm(endpoint, method, token, data)
    if(onSubmit) {
      if(onSubmit(data) !== false) return onSetStatus('success')
      return onSetStatus('failure')
    }
    return onSetStatus('success')
  }

  _handleSuccess() {
    const { data } = this.props
    this.props.onSetStatus('ready')
    this.props.onSuccess(data)
  }

  _handleValidate() {
    this.props.onValidate()
  }

}

export default Form
