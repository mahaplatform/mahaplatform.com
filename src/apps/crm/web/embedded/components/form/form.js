import PropTypes from 'prop-types'
import Header from './header'
import Footer from './footer'
import Fields from './fields'
import React from 'react'
import _ from 'lodash'

class Form extends React.Component {

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

  _handlePayment = this._handlePayment.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { config, isOpen, status } = this.props
    const { closed_message, confirmation_message } = config.settings
    const active = _.includes(['ready','validating','submitting','failure'], status)
    return (
      <div className="maha-form">
        { config.header &&
          <Header { ...this._getHeader() } />
        }
        { active && isOpen && <Fields { ...this._getFields() } /> }
        { status === 'success' &&
          <div className="maha-form-closed" dangerouslySetInnerHTML={{ __html: confirmation_message }} />
        }
        { !isOpen &&
          <div className="maha-form-closed" dangerouslySetInnerHTML={{ __html: closed_message }} />
        }
        { config.footer &&
          <Footer { ...this._getFooter() } />
        }
      </div>
    )
  }

  componentDidMount() {
    const { config } = this.props
    const { captcha } = config.settings
    if(!captcha) this.props.onSetHuman()
  }

  componentDidUpdate(prevProps) {
    const { isValid, status } = this.props
    if(isValid !== prevProps.isValid && isValid) {
      this._handleSubmit()
    }
    if(status !== prevProps.status) {
      if(status === 'success') this._handleSuccess()
    }
  }

  _getFields() {
    return this.props
  }

  _getFooter() {
    const { config } = this.props
    return { config }
  }

  _getHeader() {
    const { config } = this.props
    return { config }
  }

  _handlePayment(method, payment) {
    this.props.onPay({ method, payment })
  }

  _handleSubmit() {
    const { code, data } = this.props
    this.props.onSubmit(code, data)
  }

  _handleSuccess() {
    const { config } = this.props
    const { confirmation_strategy, confirmation_redirect } = config.settings
    if(confirmation_strategy === 'redirect') {
      window.location.href = confirmation_redirect
    }
  }

}

export default Form
