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
    ipaddress: PropTypes.string,
    isActive: PropTypes.bool,
    isOpen: PropTypes.bool,
    isReady: PropTypes.bool,
    isValid: PropTypes.bool,
    mode: PropTypes.string,
    ready: PropTypes.array,
    referer: PropTypes.string,
    requiresPayment: PropTypes.bool,
    settings: PropTypes.object,
    starttime: PropTypes.number,
    status: PropTypes.string,
    summary: PropTypes.object,
    token: PropTypes.string,
    validated: PropTypes.array,
    onChange: PropTypes.func,
    onPay: PropTypes.func,
    onSave: PropTypes.func,
    onSetHuman: PropTypes.func,
    onSetMode: PropTypes.func,
    onSetPaid: PropTypes.func,
    onSetReady: PropTypes.func,
    onSetStatus: PropTypes.func,
    onSetValid: PropTypes.func,
    onValidate: PropTypes.func,
    onSubmit: PropTypes.func
  }

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
    const { code, config, data, settings, summary, token, onSetPaid } = this.props
    return {
      form: {
        code,
        data,
        token
      },
      settings,
      program: config.program,
      summary,
      onSuccess: onSetPaid
    }
  }

  _getSection() {
    const { config } = this.props
    return { config }
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
    const { strategy, redirect } = config.confirmation
    if(strategy === 'redirect') {
      window.location.href = redirect
    }
  }

}

export default Form
