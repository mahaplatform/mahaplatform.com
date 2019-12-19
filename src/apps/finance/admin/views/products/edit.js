import RevenueTypeToken from '../../tokens/revenue_type'
import ProjectToken from '../../tokens/project'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    product: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { product } = this.props
    return {
      title: 'Edit Product',
      method: 'patch',
      endpoint: `/api/admin/finance/products/${product.id}/edit`,
      action: `/api/admin/finance/products/${product.id}`,
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a Title', required: true },
            { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/projects', value: 'id', text: 'title', required: true, format: ProjectToken },
            { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', value: 'id', text: 'title', required: true, format: RevenueTypeToken },
            { label: 'Price Type', name: 'price_type', type: 'radiogroup', options: [{value:'fixed',text:'Fixed Price'},{value:'sliding_scale',text:'Sliding Scale'}], required: true },
            { label: 'Fixed Price', name: 'fixed_price', type: 'moneyfield', placeholder: 'Fixed Price', required: true },
            { label: 'Low Price', name: 'low_price', type: 'moneyfield', placeholder: 'Low Price' },
            { label: 'High Price', name: 'high_price', type: 'moneyfield', placeholder: 'High Price' },
            { label: 'Tax Rate', name: 'tax_rate', type: 'numberfield', placeholder: 'Tax Rate' },
            { label: 'Tax Deductible?', name: 'is_tax_deductible', type: 'checkbox' }
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

export default Edit
