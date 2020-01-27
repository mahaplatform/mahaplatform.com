import PropTypes from 'prop-types'
import Payment from './payment'
import Header from './header'
import Footer from './footer'
import Fields from './fields'
import React from 'react'

class Form extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    data: PropTypes.object,
    errors: PropTypes.object,
    fields: PropTypes.array,
    human: PropTypes.bool,
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
    const { config } = this.props
    return (
      <div className="maha-form">
        { config.header &&
          <Header { ...this._getHeader() } />
        }
        { false && <Payment { ...this._getPayment() } /> }
        <Fields { ...this._getFields() } />
        { config.footer &&
          <Footer { ...this._getFooter() } />
        }
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { isValid, isReady } = this.props
    if(isValid !== prevProps.isValid && isValid) {
      this._handleSubmit()
    }
    if(isReady !== prevProps.isReady && isReady) {
      console.log('ready')
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
    const { data } = this.props
    console.log('submitting ', data)
  }

}

export default Form
