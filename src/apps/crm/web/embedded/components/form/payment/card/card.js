import PropTypes from 'prop-types'
import React from 'react'

class Card extends React.Component {

  static propTypes = {
    cvv: PropTypes.string,
    expirationDate: PropTypes.string,
    number: PropTypes.string,
    payment: PropTypes.object,
    summary: PropTypes.object,
    token: PropTypes.string,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return (
      <div className="maha-payment-item">
        <div className="maha-payment-label">Credit Card</div>
        <div className="maha-payment-form">
          <div className="field">
            <label>Card Number</label>
            <input { ...this._getInput('number', '1111 1111 1111 1111') } />
          </div>
          <div className="two fields">
            <div className="field">
              <label>Expiration</label>
              <input { ...this._getInput('expirationDate', 'MM/YY') } />
            </div>
            <div className="field">
              <label>CVV</label>
              <input { ...this._getInput('cvv', '123') } />
            </div>
          </div>
          <button className="ui fluid blue button" onClick={ this._handleSubmit }>
            Submit Payment
          </button>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { payment, onSuccess } = this.props
    if(payment !== prevProps.payment) {
      onSuccess(payment)
    }
  }

  _getInput(name, placeholder) {
    return {
      type: 'text',
      placeholder,
      onChange: this._handleUpdate.bind(this, name),
      value: this.props[name]
    }
  }

  _handleSubmit() {
    const { nameOnCard, number, cvv, expirationDate, token } = this.props
    const data = { nameOnCard, number, cvv, expirationDate }
    this.props.onSubmit(token, data)
  }

  _handleUpdate(name, e) {
    this.props.onUpdate(name, e.target.value)
  }

}

export default Card
