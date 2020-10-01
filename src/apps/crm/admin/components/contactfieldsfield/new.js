import ContactField from '../../../../crm/admin/components/contactfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class New extends React.PureComponent {

  static propTypes = {
    fields: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    field: {
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    }
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { field } = this.state
    return {
      title: 'New Field',
      method: 'post',
      cancelIcon: 'chevron-left',
      saveText: 'Done',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', value: field.code },
            { name: 'strategy', type: 'radiogroup', deselectable: false, options: [
              { value: 'contact', text: 'Choose an existing contact field' },
              { value: 'custom', text: 'Create a custom field' }
            ] },
            ...this._getStrategy()
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { field } = this.state
    if(field.strategy === 'contact') {
      return [
        { label: 'Contact Field', name: 'contactfield', type: ContactField, fields: this.props.fields },
        { name: 'type', type: 'hidden', defaultValue: 'contactfield' },
        ...this._getContactFields()
      ]
    }
    if(field.strategy === 'custom') {
      const typefields = this._getTypeFields()
      return [
        { label: 'Input Type', name: 'type', type: 'dropdown', options: this._getTypes(), value: 'value', text: 'text', defualtValue: 'textfield', required: true },
        ...field.type ? [
          { label: 'Name', name: 'name', type: 'tokenfield', placeholder: 'Enter a name', required: true },
          { label: 'Label', name: 'label', type: 'textfield', placeholder: 'Enter a label' },
          { label: 'Instructions', name: 'instructions', type: 'htmlfield', placeholder: 'Enter instructions' },
          { label: 'Required', name: 'required', type: 'checkbox', prompt: 'This field is required' },
          ...typefields
        ] : []
      ]
    }
    return []
  }

  _getFields() {
    const { fields } = this.props
    return fields
  }

  _getContactFields() {
    const { field } = this.state
    if(field.contactfield) {
      const { instructions, label, type, prompt, required } = field.contactfield
      return [
        { label: 'Name', name: 'name', type: 'tokenfield', placeholder: 'Enter a name', required: true, defaultValue: { value: label } },
        { label: 'Label', name: 'label', type: 'textfield', placeholder: 'Enter a label', defaultValue: label },
        { label: 'Instructions', name: 'instructions', type: 'htmlfield', placeholder: 'Enter instructions', defaultValue: instructions },
        { label: 'Required', name: 'required', type: 'checkbox', prompt: 'This field is required', defaultValue: required },
        ...type === 'checkbox' ? [
          { label: 'Prompt', name: 'prompt', type: 'htmlfield', placeholder: 'Enter prompt', defaultValue: prompt  }
        ] : []
      ]
    }
    return []
  }

  _getTypes() {
    return [
      { value: 'addressfield', text: 'Address Field' },
      { value: 'checkbox', text: 'Checkbox' },
      { value: 'checkboxes', text: 'Checkboxes' },
      { value: 'datefield', text: 'Date Field' },
      { value: 'dropdown', text: 'Dropdown' },
      { value: 'emailfield', text: 'Email Field' },
      { value: 'filefield', text: 'File Field' },
      { value: 'moneyfield', text: 'Money Field' },
      { value: 'numberfield', text: 'Number Field' },
      { value: 'phonefield', text: 'Phone Field' },
      { value: 'radiogroup', text: 'Radio Group' },
      { value: 'textarea', text: 'Text Area' },
      { value: 'textfield', text: 'Text Field' },
      { value: 'timefield', text: 'Time Field' }
    ]
  }

  _getTypeFields() {
    const { field } = this.state
    const config = field.config || {}
    if(_.includes(['textfield','textarea'], field.type)) {
      return [
        { label: 'Placeholder', name: 'config.placeholder', type: 'textfield', placeholder: 'Enter placeholder text', defaultValue: config.placeholder },
        { type: 'fields', fields: [
          { label: 'Min Length', name: 'config.min_length', type: 'numberfield', placeholder: 'Enter maximium character length', defaultValue: config.min_length },
          { label: 'Max Length', name: 'config.max_length', type: 'numberfield', placeholder: 'Enter minimum character length', defaultValue: config.max_length }
        ]}
      ]
    }
    if(_.includes(['addressfield','datefield','phonefield','timefield'], field.type)) {
      return [
        { label: 'Placeholder', name: 'config.placeholder', type: 'textfield', placeholder: 'Enter placeholder text', defaultValue: config.placeholder }
      ]
    }
    if(field.type === 'numberfield') {
      return [
        { label: 'Placeholder', name: 'config.placeholder', type: 'textfield', placeholder: 'Enter placeholder text', defaultValue: config.placeholder },
        { type: 'fields', fields: [
          { label: 'Min', name: 'config.min', type: 'numberfield', placeholder: 'Enter maximium value', defaultValue: config.min },
          { label: 'Max', name: 'config.max', type: 'numberfield', placeholder: 'Enter minimum value', defaultValue: config.max }
        ]}
      ]
    }
    if(_.includes(['checkboxes','radiogroup','dropdown'], field.type)) {
      return [
        { label: 'Options', name: 'config.options', type: 'tablefield', columns: [
          { label: 'Value', key: 'value' },
          { label: 'Text', key: 'text' }
        ], defaultValue: config.options }
      ]
    }
    return []
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(field) {
    this.setState({
      field: {
        ...this.state.field,
        ...field
      }
    })
  }

  _handleSuccess(field) {
    this.props.onDone({
      ..._.omit(field, ['strategy'])
    })
  }

}

export default New
