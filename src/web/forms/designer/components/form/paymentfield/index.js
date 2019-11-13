import PropTypes from 'prop-types'
import PayPal from './paypal'
import Card from './card'
import React from 'react'
import ACH from './ach'

const methods = [
  {
    name: 'apple',
    label: 'Apple Pay',
    icon: 'apple',
    component: null
  },
  {
    name: 'google',
    label: 'Google Pay',
    icon: 'android',
    component: null
  },
  {
    name: 'paypal',
    label: 'PayPal',
    icon: 'paypal',
    component: PayPal
  },
  {
    name: 'card',
    label: 'Credit Card',
    icon: 'credit-card-alt',
    component: Card
  },
  {
    name: 'ach',
    label: 'Bank Account',
    icon: 'university',
    component: ACH
  }
]

class PaymentField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    name: PropTypes.string
  }

  state = {
    selected: null
  }

  render() {
    const { selected } = this.state
    return (
      <div className="maha-paymentfield">
        { selected === null &&
          <div className="maha-paymentfield-methods">
            { methods.map((method, index) => (
              <div className={`maha-paymentfield-method ${method.name}`} key={`method_${index}`} onClick={ this._handleChoose.bind(this, index) }>
                <div className="maha-paymentfield-method-icon">
                  <i className={`fa fa-${ method.icon }`} />
                </div>
                <div className="maha-paymentfield-method-label">
                  Pay with { method.label }
                </div>
              </div>
            ))}
          </div>
        }
        { selected !== null &&
          <div className="maha-paymentfield-payment">
            <div className={`maha-paymentfield-chosen ${methods[selected].name}`}>
              <div className="maha-paymentfield-chosen-icon">
                <i className={`fa fa-${ methods[selected].icon }`} />
              </div>
              <div className="maha-paymentfield-chosen-label">
                { methods[selected].label }
              </div>
              <div className="maha-paymentfield-chosen-change" onClick={ this._handleChoose.bind(this, null) }>
                change
              </div>
            </div>
            { methods[selected].component &&
              <div className="maha-paymentfield-fields">
                { this._getComponent() }
              </div>
            }
          </div>
        }
      </div>
    )
  }

  _getComponent() {
    const { selected } = this.state
    const Component = methods[selected].component
    return Component ? <Component /> : null
  }

  _handleChoose(selected) {
    this.setState({ selected })
  }

}

export default PaymentField
