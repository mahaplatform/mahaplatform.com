import PropTypes from 'prop-types'
import Form from '../form'
import React from 'react'
import _ from 'lodash'

class New extends React.Component {

  static contextTypes = {
    form: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    datasources: PropTypes.array,
    action: PropTypes.string
  }

  state = {
    type: null,
    data_type: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { action } = this.props
    return {
      title: 'New Field',
      method: 'post',
      action,
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Input Type', name: 'type', type: 'dropdown', options: this._getTypes(), value: 'value', text: 'text', defualtValue: 'textfield', required: true },
            ...this._getFields()
          ]
        }
      ]
    }
  }

  _getFields() {
    const { type } = this.state
    if(!type) return []
    return [
      { label: 'Name', name: 'name', type: 'tokenfield', placeholder: 'Enter a name', required: true },
      { label: 'Label', name: 'label', type: 'textfield', placeholder: 'Enter a label', required: true },
      { label: 'Instructions', name: 'instructions', type: 'htmlfield', placeholder: 'Enter instructions' },
      { label: 'Required', name: 'required', type: 'checkbox', prompt: 'This field is required' },
      ...this._getTypeFields()
    ]
  }

  _getTypes() {
    return [
      { value: 'addressfield', text: 'Address Field' },
      { value: 'checkbox', text: 'Checkbox' },
      { value: 'checkboxgroup', text: 'Checkbox Group' },
      { value: 'colorfield', text: 'Color Picker' },
      { value: 'datefield', text: 'Date Field' },
      { value: 'dropdown', text: 'Drop Down' },
      { value: 'emailfield', text: 'Email Field' },
      { value: 'filefield', text: 'File Field' },
      { value: 'htmlfield', text: 'HTML Field' },
      { value: 'imagefield', text: 'Image Field' },
      { value: 'lookup', text: 'Lookup' },
      { value: 'moneyfield', text: 'Money Field' },
      { value: 'numberfield', text: 'Number Field' },
      { value: 'phonefield', text: 'Phone Field' },
      { value: 'radiogroup', text: 'Radio Group' },
      { value: 'textfield', text: 'Text Field' },
      { value: 'textarea', text: 'Text Area' },
      { value: 'timefield', text: 'Time Field' },
      { value: 'urlfield', text: 'URL Field' },
      { value: 'videofield', text: 'Video Field' }
    ]
  }

  _getTypeFields() {
    const { data_type, type } = this.state
    const { datasources } = this.props
    if(!type) return []
    const fields = []
    if(type === 'textfield' || type === 'textarea') {
      fields.push({ type: 'fields', fields: [
        { label: 'Min Length', name: 'config.min_length', type: 'textfield' },
        { label: 'Max Length', name: 'config.max_length', type: 'textfield' }
      ] })
    }
    if(type === 'numberfield') {
      fields.push({ type: 'fields', fields: [
        { label: 'Min', name: 'config.min', type: 'textfield' },
        { label: 'Max', name: 'config.max', type: 'textfield' }
      ] })
    }
    if(type === 'lookup') {
      fields.push({ label: 'Multiple Values', name: 'config.multiple', type: 'radiogroup', options: [
        { value: false, text: 'User can pick one value' },
        { value: true, text: 'User can pick multiple values'}
      ], defaultValue: false  })
    }
    if(_.includes(['checkboxgroup','radiogroup','lookup','dropdown'], type)) {
      if(datasources && datasources.length > 0) {
        fields.push({ label: 'Data Type', name: 'config.data_type', type: 'radiogroup', options: [
          { value: 'static', text: 'Static' },
          { value: 'dynamic', text: 'Dynamic' }
        ], defaultValue: 'static' })
      } else {
        fields.push({ name: 'config.data_type', type: 'hidden', defaultValue: 'static' })
      }
      if(data_type === 'static') {
        fields.push({ label: 'Options', name: 'config.options', type: 'tablefield', columns: [
          { label: 'Value', key: 'value' },
          { label: 'Text', key: 'text' }
        ] })
      }
      if(data_type === 'dynamic') {
        fields.push({ label: 'Datasource', name: 'config.datasource', type: 'lookup', options: datasources.map(datasource => {
          return {
            value: {
              endpoint: datasource.endpoint,
              text: datasource.text,
              value: datasource.value,
              type_id: datasource.type_id
            },
            text: datasource.label
          }
        })})
      }
    }
    return fields
  }

  _handleCancel() {
    const { form, modal } = this.context
    if(form) return form.pop()
    if(modal) return modal.close()
  }

  _handleChangeField(name, value) {
    if(name === 'type') {
      this.setState({
        type: value
      })
    } else if(name === 'config.data_type') {
      this.setState({
        data_type: value
      })
    }
  }

  _handleSuccess(result) {
    const { form, modal } = this.context
    if(form) return form.pop()
    if(modal) return modal.close()
  }

}

export default New
