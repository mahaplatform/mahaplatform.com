import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Product extends React.Component {

  static propTypes = {
    formdata: PropTypes.object,
    props: PropTypes.object,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onNext: PropTypes.func,
    onSave: PropTypes.func
  }

  form = null

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { props } = this.props
    return {
      reference: node => this.form = node,
      showHeader: false,
      buttons: [
        { label: 'Prev', color: 'red', disabled: true, handler: this._handleCancel },
        { label: 'Next', color: 'red', handler: this._handleSubmit }
      ],
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter title' },
            { label: 'Categories', name: 'category_ids', type: 'checkboxes', endpoint: `/api/admin/stores/stores/${props.store.id}/categories`, value: 'id', text: 'title', placeholder: 'Choose a category' },
            { label: 'Type', name: 'type', type: 'dropdown', options: [
              { value: 'physical', text: 'Physical Product' },
              { value: 'file', text: 'File' },
              { value: 'url', text: 'URL' }
            ], required: true, defaultValue: 'physical' },
            { label: 'Description', name: 'description', type: 'htmlfield', placeholder: 'Enter an optional description' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(product) {
    this.props.onChange(product)
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(product) {
    this.props.onNext(product)
  }

}

export default Product
