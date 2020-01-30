import Confirmation from './confirmation'
import PropTypes from 'prop-types'
import Payment from './payment'
import Layout from './layout'
import Header from './header'
import Footer from './footer'
import Fields from './fields'
import Closed from './closed'
import React from 'react'

class Form extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    config: PropTypes.object,
    data: PropTypes.object,
    errors: PropTypes.object,
    fields: PropTypes.array,
    human: PropTypes.bool,
    isActive: PropTypes.bool,
    isOpen: PropTypes.bool,
    isReady: PropTypes.bool,
    isValid: PropTypes.bool,
    mode: PropTypes.string,
    ready: PropTypes.array,
    requiresPayment: PropTypes.bool,
    status: PropTypes.string,
    summary: PropTypes.object,
    token: PropTypes.string,
    validated: PropTypes.array,
    onChange: PropTypes.func,
    onPay: PropTypes.func,
    onSave: PropTypes.func,
    onSetHuman: PropTypes.func,
    onSetMode: PropTypes.func,
    onSetReady: PropTypes.func,
    onSetStatus: PropTypes.func,
    onSetValid: PropTypes.func,
    onValidate: PropTypes.func,
    onSubmit: PropTypes.func
  }

  _handlePayment = this._handlePayment.bind(this)
  _handleProceed = this._handleProceed.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { config, isActive, isOpen, mode, status } = this.props
    return (
      <Layout { ...this._getSection() }>
        <div className="maha-form">
          { config.header &&
            <Header { ...this._getSection() } />
          }
          { isActive && isOpen && mode === 'fields' &&
            <Fields { ...this._getFields() } />
          }
          { isActive && isOpen && mode === 'payment' &&
            <Payment { ...this._getPayment() } />
          }
          { status === 'success' &&
            <Confirmation { ...this._getSection() } />
          }
          { !isOpen &&
            <Closed { ...this._getSection() } />
          }
          { config.footer &&
            <Footer { ...this._getSection() } />
          }
        </div>
      </Layout>
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
      this._handleProceed()
    }
    if(status !== prevProps.status) {
      if(status === 'success') this._handleSuccess()
    }
  }

  _getFields() {
    return this.props
  }

  _getPayment() {
    const { config, summary } = this.props
    return {
      ...this.props,
      program: config.program,
      summary,
      onSubmit: this._handlePayment
    }
  }

  _getSection() {
    const { config } = this.props
    return { config }
  }

  _handlePayment(amount, method, payment) {
    const { code, data, token } = this.props
    this.props.onSubmit(token, code, {
      ...data,
      payment: {
        amount,
        method,
        payment
      }
    })
  }

  _handleProceed() {
    const { requiresPayment, onSetMode } = this.props
    if(requiresPayment) return onSetMode('payment')
    this._handleSubmit()
  }

  _handleSubmit() {
    const { code, data, token } = this.props
    this.props.onSubmit(token, code, data)
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
