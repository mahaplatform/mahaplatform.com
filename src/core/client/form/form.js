import Recaptcha from './recaptcha'
import PropTypes from 'prop-types'
import Fields from './fields'
import Submit from './submit'
import React from 'react'

class Form extends React.Component {

  static propTypes = {
    captcha: PropTypes.bool,
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
    submittable: PropTypes.array,
    submitText: PropTypes.string,
    status: PropTypes.string,
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
    onSuccess: PropTypes.func
  }

  static defaultProps = {
    captcha: true,
    submitText: 'Submit',
    onFailure: () => {},
    onSuccess: () => {}
  }

  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { captcha } = this.props
    return (
      <div className="ui form">
        <Fields { ...this._getFields() } />
        { captcha &&
          <div className="maha-form-captcha">
            <Recaptcha { ...this._getRecaptcha() } />
          </div>
        }
        <div className="maha-form-submit">
          <Submit { ... this._getSubmit() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { captcha } = this.props
    if(!captcha) this.props.onSetHuman()
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

  _getFields() {
    return this.props
  }

  _getRecaptcha() {
    const { fields, onSetHuman } = this.props
    return {
      tabIndex: fields.length + 1,
      onSuccess: onSetHuman
    }
  }

  _handleSubmit() {
    const { endpoint, method, data, token } = this.props
    this.props.onSubmit(endpoint, method, token, data)
  }

  _handleSuccess() {
    const { data } = this.props
    this.props.onSuccess(data)
  }

  _handleValidate() {
    this.props.onValidate()
  }

}

export default Form
