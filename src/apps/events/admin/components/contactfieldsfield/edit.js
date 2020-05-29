import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Edit extends React.PureComponent {

  static propTypes = {
    field: PropTypes.object,
    fields: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    field: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { field } = this.state
    if(!field) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { field } = this.props
    this.setState({ field })
  }

  _getForm() {
    const { field } = this.state
    return {
      title: 'Edit Field',
      method: 'post',
      cancelIcon: 'chevron-left',
      saveText: 'Done',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', defaultValue: field.code },
            ...this._getStrategy()
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { field } = this.state
    const { contactfield, type } = field
    if(contactfield) {
      return [
        { label: 'Contact Field', type: 'text', disabled: true, value: contactfield.label },
        { name: 'contactfield', type: 'hidden', value: contactfield },
        { name: 'type', type: 'hidden', value: 'contactfield' },
        ...this._getContactFields()
      ]
    } else  {
      const typefields = this._getTypeFields()
      return [
        { label: 'Input Type', type: 'text', disabled: true, value: type },
        { name: 'type', type: 'hidden', value: type },
        ...field.type ? [
          { label: 'Name', name: 'name', type: 'tokenfield', placeholder: 'Enter a name', required: true, defaultValue: field.name },
          { label: 'Label', name: 'label', type: 'textfield', placeholder: 'Enter a label', defaultValue: field.label },
          { label: 'Instructions', name: 'instructions', type: 'htmlfield', placeholder: 'Enter instructions', defaultValue: field.instructions },
          { label: 'Required', name: 'required', type: 'checkbox', prompt: 'This field is required', defaultValue: field.required },
          ...typefields
        ] : []
      ]
    }
  }

  _getFields() {
    const { fields } = this.props
    return [
      { label: 'Contact', fields: [
        { label: 'Phone', name: 'phone', type: 'phonefield' },
        { label: 'Address', name: 'address', type: 'addressfield' },
        { label: 'Birthday', name: 'birthday', type: 'textfield' },
        { label: 'Spouse', name: 'spouse', type: 'textfield' }
      ] },
      ...fields.map(group => ({
        label: group.label,
        fields: group.fields.map(field => ({
          code: field.code,
          label: field.label,
          name: `values.${field.code}`,
          type: field.type,
          instructions: field.instructions,
          config: field.config
        }))
      }))
    ]
  }

  _getContactFields() {
    const { field } = this.state
    if(field.contactfield) {
      return [
        { label: 'Name', name: 'name', type: 'tokenfield', placeholder: 'Enter a name', required: true, defaultValue: field.name },
        { label: 'Label', name: 'label', type: 'textfield', placeholder: 'Enter a label', defaultValue: field.label },
        { label: 'Instructions', name: 'instructions', type: 'htmlfield', placeholder: 'Enter instructions', defaultValue: field.instructions },
        { label: 'Required', name: 'required', type: 'checkbox', prompt: 'This field is required', defaultValue: field.required }
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
        ] }
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
        ] }
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
    this.props.onDone(field)
  }

}

export default Edit
