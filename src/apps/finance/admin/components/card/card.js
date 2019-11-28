import CardNumberField from '../cardnumberfield'
import Expiration from './expiration'
import PropTypes from 'prop-types'
import React from 'react'

class Card extends React.PureComponent {

  static propTypes = {
    cvv: PropTypes.string,
    expirationDate: PropTypes.string,
    number: PropTypes.string,
    payment: PropTypes.object,
    summary: PropTypes.object,
    token: PropTypes.string,
    onAuthorize: PropTypes.func,
    onChange: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  render() {
    return (
      <div className="finance-card">
        <div className="maha-form-field field required">
          <div className="maha-form-field-label">Card Number</div>
          <div className="maha-form-field-control">
            <CardNumberField { ...this._getCardNumberField() } />
          </div>
        </div>
        <div className="maha-form-field field required">
          <div className="maha-form-field-label">Expiration</div>
          <div className="maha-form-field-control">
            <Expiration { ...this._getExpiration() } />
          </div>
        </div>
        <div className="maha-form-field field required">
          <div className="maha-form-field-label">CVV</div>
          <div className="maha-form-field-control">
            <input { ...this._getInput('cvv', '123') } />
          </div>
        </div>
        <div className="ui blue button" onClick={ this._handleAuthorize.bind(this) }>
          Authorize
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetch()
  }

  componentDidUpdate(prevProps) {
    const { payment, token } = this.props
    if(token !== prevProps.token) {
      this.props.onReady()
    }
    if(payment !== prevProps.payment) {
      this.props.onChange(payment)
    }
  }

  _getPanel() {
    return {
      title: 'Charge Card'
    }
  }

  _getInput(name, placeholder) {
    return {
      type: 'text',
      placeholder,
      onChange: this._handleUpdateInput.bind(this, name),
      value: this.props[name]
    }
  }

  _getExpiration() {
    return {
      onChange: this._handleUpdate.bind(this, 'expirationDate')
    }
  }

  _getCardNumberField() {
    return {
      onChange: this._handleUpdate.bind(this, 'number')
    }
  }

  _handleAuthorize() {
    const {number, cvv, expirationDate, token } = this.props
    const data = { number, cvv, expirationDate }
    this.props.onAuthorize(token, data)
  }

  _handleUpdateInput(name, e) {
    this._handleUpdate(name, e.target.value)
  }

  _handleUpdate(name, value) {
    this.props.onUpdate(name, value)
  }

}

export default Card
