import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Store extends React.Component {

  static propTypes = {
    onBack: PropTypes.func,
    onNext: PropTypes.func
  }

  form = null

  _handleBack = this._handleBack.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      reference: node => this.form = node,
      showHeader: false,
      buttons: [
        { label: 'Prev', color: 'red', handler: this._handleBack },
        { label: 'Next', color: 'red', handler: this._handleSubmit }
      ],
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter title' },
            { label: 'URL', name: 'permalink', type: 'permalinkfield', prefix: '/stores', placeholder: '/path/to/event' }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(product) {
    this.props.onNext(product)
  }

}

export default Store
