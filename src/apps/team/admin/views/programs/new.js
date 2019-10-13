import AccessToken from '../../tokens/access'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  state = {
    is_private: false
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Program',
      method: 'post',
      action: '/api/admin/team/programs',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Logo', name: 'logo_id', type: 'filefield', prompt: 'Choose Logo', multiple: false },
            { label: 'Channels', name: 'channels', type: 'checkboxgroup', options: [{text:'Email',value:'email'},{text:'SMS',value:'sms'},{text:'Voice',value:'voice'},{text:'Mail',value:'mail'}] },
            { label: 'Privacy', name: 'is_private', type: 'radiogroup', options: [false, true], format: AccessToken, required: true, defaultValue: false },
            ...this._getAccess()
          ]
        }
      ]
    }
  }

  _getAccess() {
    if(!this.state.is_private) return []
    return [
      { label: 'Delegate Access', name: 'accesses', type: 'assignmentfield', placeholder: 'Specify who can see content from this program' }
    ]
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChangeField(name, value) {
    if(name === 'is_private') {
      this.setState({
        is_private: value
      })
    }
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default New
