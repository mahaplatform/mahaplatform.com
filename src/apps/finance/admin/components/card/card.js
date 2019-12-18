import CardField from './cardfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Card extends React.PureComponent {

  static propTypes = {
    payment: PropTypes.object,
    summary: PropTypes.object,
    token: PropTypes.string,
    onAuthorize: PropTypes.func,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onUpdate: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {},
    onValid: () => {}
  }

  form = null

  state = {
    number: null
  }

  _handleAuthorize = this._handleAuthorize.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    return (
      <div className="finance-card">
        <Form { ...this._getForm() } />
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetch()
  }

  componentDidUpdate(prevProps) {
    const { payment, token } = this.props
    if(token !== prevProps.token) {
      this.props.onReady(this._handleValidate)
    }
    if(payment !== prevProps.payment) {
      this.props.onValid(payment)
    }
  }

  _getForm() {
    return {
      reference: form => this.form = form,
      inline: true,
      onChangeField: this._handleChangeField,
      onSubmit: this._handleAuthorize,
      sections: [
        {
          fields: [
            { name: 'card', type: CardField }
          ]
        }
      ]
    }
  }

  _getIcon() {
    const { payment } = this.props
    const { card_type } = payment
    if(card_type === 'visa') return 'visa'
    if(card_type === 'mastercard') return 'mastercard'
    if(card_type === 'american express') return 'amex'
    if(card_type === 'discover') return 'discover'
    return null
  }

  _handleAuthorize({ card }) {
    const { token } = this.props
    this.props.onAuthorize(token, card)
    return true
  }

  _handleValidate() {
    this.form.submit()
  }

}

export default Card
