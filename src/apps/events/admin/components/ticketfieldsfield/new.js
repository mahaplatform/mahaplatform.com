import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class New extends React.PureComponent {

  static propTypes = {
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
    const typefields = this._getTypeFields()
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
            { label: 'Input Type', name: 'type', type: 'dropdown', options: this._getTypes(), value: 'value', text: 'text', defualtValue: 'textfield', required: true },
            ...typefields ? [
              { label: 'Name', name: 'name', type: 'tokenfield', placeholder: 'Enter a name', required: true },
              { label: 'Label', name: 'label', type: 'textfield', placeholder: 'Enter a label' },
              { label: 'Instructions', name: 'instructions', type: 'htmlfield', placeholder: 'Enter instructions' },
              { label: 'Required', name: 'required', type: 'checkbox', prompt: 'This field is required' },
              ...typefields
            ] : []
          ]
        }
      ]
    }
  }

  _getTypes() {
    return [
      { value: 'addressfield', text: 'Address Field' },
      { value: 'checkbox', text: 'Checkbox' },
      { value: 'checkboxes', text: 'Checkbox Group' },
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
    if(field.type === 'numberfield') {
      return [
        { label: 'Placeholder', name: 'config.placeholder', type: 'textfield', placeholder: 'Enter placeholder text', defaultValue: config.placeholder },
        { type: 'fields', fields: [
          { label: 'Min', name: 'config.min', type: 'numberfield', placeholder: 'Enter maximium value', defaultValue: config.min },
          { label: 'Max', name: 'config.max', type: 'numberfield', placeholder: 'Enter minimum value', defaultValue: config.max }
        ] }
      ]
    }
    if(_.includes(['datefield','timefield'], field.type)) {
      return [
        { label: 'Placeholder', name: 'config.placeholder', type: 'textfield', placeholder: 'Enter placeholder text', defaultValue: config.placeholder }
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
    return null
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
