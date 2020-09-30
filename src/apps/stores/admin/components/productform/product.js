import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Product extends React.Component {

  static propTypes = {
    onCancel: PropTypes.func,
    onNext: PropTypes.func
  }

  form = null

  _handleCancel = this._handleCancel.bind(this)
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
        { label: 'Prev', color: 'red', disabled: true, handler: this._handleCancel },
        { label: 'Next', color: 'red', handler: this._handleSubmit }
      ],
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter title' },
            { label: 'Description', name: 'description', type: 'htmlfield', placeholder: 'Enter an optional description' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(product) {
    this.props.onNext(product)
  }

}

export default Product
