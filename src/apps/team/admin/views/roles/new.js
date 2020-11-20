import React from 'react'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import Access from '../../components/access'

class RolesNew extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Role',
      method: 'post',
      action: '/api/admin/team/roles',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Access', name: 'assignments', type: Access }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.history.push(`/team/roles/${result.id}`)
    this.context.modal.close()
  }

}

export default RolesNew
