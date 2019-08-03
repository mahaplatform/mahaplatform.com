import Criteria from '../../components/criteria'
import TypeToken from '../../tokens/type'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  state = {
    type: 'static'
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { type } = this.state
    return {
      title: 'New Contact',
      method: 'post',
      action: '/api/admin/crm/lists',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield', placeholder: 'Enter a name', required: true },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Enter a description', required: true },
            { label: 'Type', name: 'type', type: 'radiogroup', required: true, options: [{ value:'static', text:'Static List' }, { value:'active', text:'Active List' }], defaultValue: type, format: TypeToken },
            ...this._getType()
          ]
        }
      ]
    }
  }

  _getType() {
    const { type } = this.state
    if(type === 'static') return []
    return [
      { label: 'Criteria', name: 'critera', type: Criteria, placeholder: 'Select criteria', required: true }
    ]
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChangeField(name, value) {
    if(name === 'type') {
      this.setState({
        type: value
      })
    }
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default New
