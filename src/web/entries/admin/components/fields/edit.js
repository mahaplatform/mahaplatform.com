import PropTypes from 'prop-types'
import Form from '../form'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    endpoint: PropTypes.string,
    id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
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
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Label', name: 'label', type: 'textfield' },
            { label: 'Name', name: 'name', type: 'textfield' },
            { label: 'Instructions', name: 'instructions', type: 'textarea', rows: 2 },
            { label: 'Input Type', name: 'type', type: 'lookup', options: this._getOptions(), value: 'value', text: 'text' }
          ]
        }
      ]
    }
  }

  _getOptions() {
    return [
      { value: 'addressfield', text: 'Address Field' },
      { value: 'checkbox', text: 'Checkbox' },
      { value: 'checkboxgroup', text: 'Checkbox Group' },
      { value: 'colorfield', text: 'Color Picker' },
      { value: 'datefield', text: 'Date Field' },
      { value: 'emailfield', text: 'Email Field' },
      { value: 'filefield', text: 'File Field' },
      { value: 'imagefield', text: 'Image Field' },
      { value: 'lookup', text: 'Lookup' },
      { value: 'moneyfield', text: 'Money Field' },
      { value: 'numberfield', text: 'Number Field' },
      { value: 'phonefield', text: 'Phone Field' },
      { value: 'radiogroup', text: 'Radio Group' },
      { value: 'textfield', text: 'Text Field' },
      { value: 'textarea', text: 'Text Area' },
      { value: 'timefield', text: 'Time Field' },
      { value: 'urlfield', text: 'URL Field' }
    ]
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Edit
