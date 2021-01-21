import Confirmation from './confirmation'
import { Payment } from '@client'
import PropTypes from 'prop-types'
import Resizer from './resizer'
import Summary from './summary'
import Layout from './layout'
import Header from './header'
import Footer from './footer'
import Fields from './fields'
import Closed from './closed'
import React from 'react'

class Form extends React.Component {

  static contextTypes = {
    analytics: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    config: PropTypes.object,
    data: PropTypes.object,
    embedded: PropTypes.bool,
    errors: PropTypes.object,
    fields: PropTypes.array,
    human: PropTypes.bool,
    ipaddress: PropTypes.string,
    isActive: PropTypes.bool,
    isOpen: PropTypes.bool,
    isReady: PropTypes.bool,
    isValid: PropTypes.bool,
    mode: PropTypes.string,
    params: PropTypes.object,
    ready: PropTypes.array,
    referer: PropTypes.string,
    requiresPayment: PropTypes.bool,
    result: PropTypes.object,
    settings: PropTypes.object,
    starttime: PropTypes.number,
    status: PropTypes.string,
    summary: PropTypes.object,
    title: PropTypes.string,
    tokens: PropTypes.object,
    token: PropTypes.string,
    validated: PropTypes.array,
    onChange: PropTypes.func,
    onPay: PropTypes.func,
    onRedirect: PropTypes.func,
    onResize: PropTypes.func,
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
    const { strategy } = config.confirmation
    return (
      <Layout { ...this._getSection() }>
        <Resizer { ...this._getResizer() }>
          { config.header &&
            <Header { ...this._getSection() } />
          }
          { isActive && isOpen && mode === 'fields' &&
            <Fields { ...this._getFields() } />
          }
          { isActive && isOpen && mode === 'payment' &&
            <div className="maha-form-body">
              <Summary { ...this._getSummary() } />
              <Payment { ...this._getPayment() } />
            </div>
          }
          { status === 'success' && strategy === 'message' &&
            <Confirmation { ...this._getSection() } />
          }
          { !isOpen &&
            <Closed { ...this._getSection() } />
          }
          { config.footer &&
            <Footer { ...this._getSection() } />
          }
        </Resizer>
      </Layout>
    )
  }

  componentDidMount() {
    this.context.analytics.trackPageView()
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
    const { code, config, data, settings, summary, title, token, onSetPaid } = this.props
    return {
      amount: Number(summary.total),
      data,
      endpoint: `/api/forms/forms/${code}`,
      lineItems: summary.line_items.map(item => ({
        ...item,
        name: `${config.program.title} - ${title} - ${item.description}`
      })),
      program: config.program,
      settings,
      token,
      onSuccess: onSetPaid
    }
  }

  _getResizer() {
    const { embedded, onResize } = this.props
    return { embedded, onResize }
  }

  _getSection() {
    const { config, embedded } = this.props
    return { config, embedded }
  }

  _getSummary() {
    return this.props.summary
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
    const { config, embedded, result } = this.props
    const { strategy, redirect } = config.confirmation
    this._handleTrack()
    if(strategy !== 'redirect') return
    if(embedded) return this.props.onRedirect(redirect)
    window.location.href = redirect
  }

  _handleTrack() {
    const { result } = this.props
    const { response_id, contact_id } = result
    this.context.analytics.setUserId(contact_id)
    this.context.analytics.trackResponse(response_id)
  }

}

export default Form
