import sections from '../sections'
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

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Contact',
      method: 'post',
      action: '/api/admin/crm/lists',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield' },
            { label: 'Description', name: 'description', type: 'textarea' },
            { label: 'Type', name: 'type', type: 'radiogroup', options: [{value:'static',text:'Static List'},{value:'smart',text:'Smart List'}], defaultValue: 'static' }
          ]
        }
      ]
    }
  }


  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default New
