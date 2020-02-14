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
      { label: 'Criteria', name: 'criteria', type: 'criteriafield', ...this._getCriteriaField() }
    ]
  }

  _getCriteriaField() {
    return {
      endpoint: '/api/admin/crm/recipients',
      entity: 'contact',
      format: ContactToken,
      fields: [
        { label: 'Contact', fields: [
          { name: 'first name', key: 'first_name', type: 'text' },
          { name: 'last name', key: 'last_name', type: 'text' },
          { name: 'email', key: 'email', type: 'text' },
          { name: 'phone', key: 'phone', type: 'text' },
          { name: 'street_1', key: 'street_1', type: 'text' },
          { name: 'city', key: 'city', type: 'text' },
          { name: 'state/province', key: 'state_province', type: 'text' },
          { name: 'postal code', key: 'postal_code', type: 'text' },
          { name: 'birthday', key: 'birthday', type: 'text' },
          { name: 'spouse', key: 'spouse', type: 'text' }
        ] },
        { label: 'Classifications', fields: [
          { name: 'interests', key: 'topic_id', type: 'select', endpoint: '/api/admin/crm/topics', text: 'title', value: 'id', comparisons: [
            { value: '$eq', text: 'is interested in' },
            { value: '$neq', text: 'is not interested in' },
            { value: '$in', text: 'is interested in one of' },
            { value: '$nin', text: 'is not interested in one of' }
          ] },
          { name: 'lists', key: 'list_id', type: 'select', endpoint: '/api/admin/crm/lists', text: 'title', value: 'id', comparisons: [
            { value: '$eq', text: 'belongs to' },
            { value: '$neq', text: 'does not belong to' },
            { value: '$in', text: 'belongs to one of' },
            { value: '$nin', text: 'does not belongs to one of' }
          ] },
          { name: 'organization', key: 'organization_id', type: 'select', endpoint: '/api/admin/crm/organizations', text: 'name', value: 'id' },
          { name: 'tags', key: 'tag_id', type: 'select', endpoint: '/api/admin/crm/tags', text: 'text', value: 'id' }
        ] }
      ],
      placeholder: 'Design criteria',
      required: true,
      title: 'Select Contacts'
    }
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
