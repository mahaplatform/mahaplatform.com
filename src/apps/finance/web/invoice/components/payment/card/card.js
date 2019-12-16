import { Form } from 'maha-public'
import PropTypes from 'prop-types'
import React from 'react'

class Card extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object,
    payment: PropTypes.object,
    token: PropTypes.string,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onSubmit: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleAuthorize = this._handleAuthorize.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { invoice } = this.props
    return {
      title: 'Credit Card',
      cancelIcon: 'chevron-left',
      buttons: [
        {
          label: 'Make Payment',
          color: 'red',
          handler: () => { console.log('foo') }
        }
      ],
      onCancel: this._handleBack,
      onSubmit: this._handleAuthorize,
      fields: [
        { label: 'Number', name: 'number', type: 'textfield' },
        { label: 'Expiration', name: 'expiration', type: 'textfield' },
        { label: 'CVV', name: 'cvv', type: 'textfield' },
        { label: 'Amount', name: 'amount', type: 'textfield', defaultValue: invoice.balance }
      ]
    }
  }

  _handleAuthorize() {
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default Card
