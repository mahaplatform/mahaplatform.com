import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Settings extends React.Component {

  static propTypes = {
    onPop: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Settings',
      method: 'patch',
      action: '/api/admin/crm',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onPop()
  }

  _handleSuccess() {
    this.props.onPop()
  }

}

export default Settings
