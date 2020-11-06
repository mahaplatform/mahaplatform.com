import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.number,
    user: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Session',
      method: 'post',
      action: '/api/admin/events/events',
      onCancel: this._handleCancel,
      onSubmit: this._handleSubmit,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(session) {
    this.context.modal.close()
  }

}


export default New
