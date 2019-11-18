import PropTypes from 'prop-types'
import React from 'react'

class Card extends React.Component {

  static propTypes = {
    cvv: PropTypes.string,
    expirationDate: PropTypes.string,
    nameOnCard: PropTypes.string,
    number: PropTypes.string,
    token: PropTypes.string,
    onSubmit: PropTypes.func,
    onUpdate: PropTypes.func
  }

  render() {
    return (
      <div className="maha-payment-form">
        <div className="two fields">
          <div className="field">
            <label>Name on Card</label>
            <input { ...this._getInput('nameOnCard', 'Name on Card') } />
          </div>
          <div className="field">
            <label>Card Number</label>
            <input { ...this._getInput('number', '1111 1111 1111 1111') } />
          </div>
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
      </div>
    )
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
