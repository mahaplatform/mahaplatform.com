import PropTypes from 'prop-types'
import Header from './header'
import Footer from './footer'
import Fields from './fields'
import React from 'react'

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
    requiresPayment: PropTypes.bool,
    status: PropTypes.object,
    onChange: PropTypes.func,
    onPay: PropTypes.func,
    onSave: PropTypes.func,
    onSetAllStatus: PropTypes.func,
    onSetHuman: PropTypes.func,
    onSetStatus: PropTypes.func,
    onSetValidate: PropTypes.func,
    onValidate: PropTypes.func,
    onSubmit: PropTypes.func
  }

  _handlePayment = this._handlePayment.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { config, isOpen } = this.props
    const { closed_strategy, closed_message } = config.settings
    return (
      <div className="maha-form">
        { config.header &&
          <Header { ...this._getHeader() } />
        }
        { isOpen && <Fields { ...this._getFields() } /> }
        { !isOpen && closed_strategy === 'message' &&
          <div className="maha-form-closed" dangerouslySetInnerHTML={{ __html: closed_message }} />
        }
        { config.footer &&
          <Footer { ...this._getFooter() } />
        }
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { isValid } = this.props
    if(isValid !== prevProps.isValid && isValid) {
      this._handleSubmit()
    }
  }

  _getFields() {
    return this.props
  }

  _getPayment() {
    const { config } = this.props
    return {
      ...this.props,
      program: config.program,
      summary: {
        products: [
          {
            tax: 0.08,
            code: 'ghijkl',
            name: '1 Flock (5 Ducks)',
            price: 5,
            quantity: 2,
            total: 10
          }
        ],
        subtotal: 10,
        total: 10,
        tax: 0
      },
      onPayment: this._handlePayment
    }
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

}

export default Form
