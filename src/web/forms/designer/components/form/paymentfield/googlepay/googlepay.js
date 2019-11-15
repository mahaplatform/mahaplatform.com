import PropTypes from 'prop-types'
import React from 'react'

class Card extends React.Component {

  static propTypes = {
    token: PropTypes.string,
    onSubmit: PropTypes.func
  }

  state = {
    selected: null
  }

  render() {
    return (
      <div className="maha-paymentfield-form">
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

  componentDidMount() {
    const { token } = this.props
    const data = {
      creditCard: {
        name_on_card: 'Greg Kops',
        number: '4111111111111111',
        cvv: '123',
        expirationDate: '10/25'
      }
    }
    this.props.onSubmit(token, data)
  }

}

export default Card
