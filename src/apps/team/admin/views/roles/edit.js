import React from 'react'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import Access from '../../components/access'

class RolesEdit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    role: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { role } = this.props
    return {
      title: 'Edit Role',
      method: 'patch',
      endpoint: `/api/admin/team/roles/${role.id}`,
      action: `/api/admin/team/roles/${role.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Description', name: 'description', type: 'textfield', required: true },
            { label: 'Access', name: 'assignments', type: Access }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default RolesEdit
