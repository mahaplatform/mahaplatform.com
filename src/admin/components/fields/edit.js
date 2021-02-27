import PropTypes from 'prop-types'
import Form from '../form'
import React from 'react'
import _ from 'lodash'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    datasources: PropTypes.array,
    endpoint: PropTypes.string,
    id: PropTypes.number
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
    const { endpoint, id } = this.props
    return {
      title: 'Edit Field',
      method: 'patch',
      endpoint: `${endpoint}/${id}`,
      action: `${endpoint}/${id}`,
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'tokenfield', placeholder: 'Enter a name', required: true },
            { label: 'Label', name: 'label', type: 'textfield', placeholder: 'Enter a label', required: true },
            { label: 'Instructions', name: 'instructions', type: 'htmlfield', placeholder: 'Enter instructions' },
            { label: 'Required', name: 'required', type: 'checkbox', prompt: 'This field is required' },
            ...this._getTypeFields()
          ]
        }
      ]
    }
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
    if(type === 'checkbox') {
      fields.push({ label: 'Prompt', name: 'config.prompt', type: 'htmlfield' })
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
        fields.push({ label: 'Datasource', name: 'config.datasource', type: 'dropdown', options: datasources.map(datasource => {
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
    this.context.modal.close()
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
    this.context.modal.close()
  }

}

export default Edit
