import ListTypeToken from '../../../../tokens/list_type'
import ContactToken from '../../../../tokens/contact'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.number
  }

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
    const { program_id } = this.props
    const { type } = this.state
    return {
      title: 'New List',
      method: 'post',
      action: `/api/admin/crm/programs/${program_id}/lists`,
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a name', required: true },
            { label: 'Type', name: 'type', type: 'radiogroup', required: true, options: [{ value:'static', text:'Static List' }, { value:'active', text:'Active List' }], defaultValue: type, format: ListTypeToken },
            ...this._getType()
          ]
        }
      ]
    }
  }

  _getType() {
    if(this.state.type === 'static') return []
    return [
      { label: 'Criteria', name: 'criteria', type: 'criteriafield', placeholder: 'Design criteria', required: true, fields: this._getFields(), endpoint: '/api/admin/crm/contacts', format: ContactToken }
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
