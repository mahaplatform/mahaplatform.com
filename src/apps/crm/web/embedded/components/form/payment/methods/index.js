import GooglePay from '../googlepay'
import ApplePay from '../applepay'
import PropTypes from 'prop-types'
import PayPal from '../paypal'
import Card from '../card'
import React from 'react'
import ACH from '../ach'

const components = {
  applepay: ApplePay,
  googlepay: GooglePay,
  paypal: PayPal,
  card: Card,
  ach: ACH
}

class Methods extends React.Component {

  static propTypes = {
    methods: PropTypes.array,
    program: PropTypes.object,
    summary: PropTypes.object,
    token: PropTypes.string,
    selected: PropTypes.number,
    onChoose: PropTypes.func,
    onSuccess: PropTypes.func
  }

  state = {
    selected: 'card'
  }

  render() {
    const { selected } = this.state
    return (
      <div className="maha-payment-item">
        { selected && components[selected] &&
          <div className="ui form">
            { this._getComponent() }
          </div>
        }
      </div>
    )
  }

  _getClass(index) {
    const { selected } = this.state
    const classes = ['maha-payment-method']
    if(index === selected) classes.push('selected')
    return classes.join(' ')
  }

  _getComponent() {
    const { selected } = this.state
    const Component = components[selected]
    return <Component { ...this._getMethod(selected) } />
  }

  _getMethod(method) {
    const { program, summary, token } = this.props
    return {
      program,
      summary,
      token,
      onChoose: this._handleChoose.bind(this, method),
      onSuccess: this._handleSuccess.bind(this, method)
    }
  }

  _handleChoose(selected) {
    this.setState({ selected })
  }

  _handleSuccess(method, data) {
    this.props.onSuccess(method, data)
  }

}

export default Methods
