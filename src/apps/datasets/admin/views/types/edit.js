import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    dataset: PropTypes.object,
    type: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { dataset, type } = this.props
    return {
      title: 'Edit Type',
      method: 'patch',
      endpoint: `/api/admin/datasets/datasets/${dataset.id}/types/${type.id}/edit`,
      action: `/api/admin/datasets/datasets/${dataset.id}/types/${type.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter title', required: true }
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

export default New
