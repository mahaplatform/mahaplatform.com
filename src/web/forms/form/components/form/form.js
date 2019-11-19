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
    finalized: PropTypes.object,
    isFinalized: PropTypes.bool,
    human: PropTypes.bool,
    isReady: PropTypes.bool,
    isValid: PropTypes.bool,
    requiresPayment: PropTypes.bool,
    status: PropTypes.object,
    onChange: PropTypes.func,
    onSave: PropTypes.func,
    onSetAllStatus: PropTypes.func,
    onSetFinalized: PropTypes.func,
    onSetHuman: PropTypes.func,
    onSetStatus: PropTypes.func,
    onSetValidate: PropTypes.func,
    onValidate: PropTypes.func,
    onSubmit: PropTypes.func
  }

  _handlePayment = this._handlePayment.bind(this)

  render() {
    return (
      <div className="maha-form">
        <Header { ...this._getHeader() } />
        <Payment { ...this._getPayment() } />
        { false && <Fields { ...this._getFields() } /> }
        <Footer { ...this._getFooter() } />
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

  _getFields() {
    return this.props
  }

  _getPayment() {
    return {
      ...this.props,
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
    return this.props.config.footer
  }

  _getHeader() {
    return this.props.config.header
  }

  _handlePayment(method, payment) {
    console.log(method, payment)
  }

}

export default Form
