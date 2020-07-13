import RevenueTypeToken from '../../../../finance/admin/tokens/revenue_type'
import ProjectToken from '../../../../finance/admin/tokens/project'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class New extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    products: PropTypes.array,
    onDone: PropTypes.func
  }

  state = {
    code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { code } = this.state
    return {
      title: 'New Product',
      cancelIcon: 'chevron-left',
      saveText: 'Done',
      onSubmit: () => true,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', value: code },
            { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'title', required: true, format: ProjectToken },
            { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [42,47] } }, value: 'id', text: 'title', required: true, format: RevenueTypeToken },
            { label: 'Description', name: 'description', required: true, type: 'textfield', placeholder: 'Describe this item' },
            { label: 'Unit Price', name: 'price', required: true, type: 'moneyfield', placeholder: '0.00' },
            { label: 'Tax Rate', name: 'tax_rate', required: true, type: 'number', placeholder: '0.000' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleSuccess(product) {
    this.props.onDone(product)
    this.context.form.pop()
  }

}

export default New
