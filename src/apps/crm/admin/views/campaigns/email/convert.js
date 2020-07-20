import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Convert extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    campaign: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { campaign } = this.props
    return {
      title: 'Convert to Template',
      method: 'post',
      action: `/api/admin/crm/programs/${campaign.program.id}/templates`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'config', type: 'hidden', value: campaign.config },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter the title', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.flash.set('success', 'The template was successfully created')
    this.context.modal.close()
  }

}

export default Convert
