import PropTypes from 'prop-types'
import React from 'react'

class Card extends React.Component {

  static propTypes = {
  }

  state = {
    selected: null
  }

  render() {
    return (
      <div className="maha-paymentfield-card">
        <div className="two fields">
          <div className="field">
            <label>Name on Card</label>
            <input type="text" placeholder="Name on Card" />
          </div>
          <div className="field">
            <label>Card Number</label>
            <input type="text" placeholder="1111 1111 1111 1111" />
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>Expiration</label>
            <input type="text" placeholder="MM/YY" />
          </div>
          <div className="field">
            <label>CVV</label>
            <input type="text" placeholder="123" />
          </div>
        </div>
      </div>
    )
  }
}

export default Card
