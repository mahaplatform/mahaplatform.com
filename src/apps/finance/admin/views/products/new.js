import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    integration: PropTypes.string
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Product',
      method: 'post',
      action: '/api/admin/finance/products',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a Title', required: true },
            { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/projects', value: 'id', text: 'title', required: true },
            { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', value: 'id', text: 'title', required: true },
            { label: 'Price Type', name: 'price_type', type: 'radiogroup', options: [{value:'fixed',text:'Fixed Price'},{value:'sliding_scale',text:'Sliding Scale'}], required: true },
            { label: 'Fixed Price', name: 'fixed_price', type: 'moneyfield', placeholder: 'Fixed Price', required: true },
            { label: 'Low Price', name: 'low_price', type: 'moneyfield', placeholder: 'Low Price', required: true },
            { label: 'High Price', name: 'high_price', type: 'moneyfield', placeholder: 'High Price', required: true },
            { label: 'Tax Rate', name: 'tax_rate', type: 'moneyfield', placeholder: 'Tax Rate', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default New
