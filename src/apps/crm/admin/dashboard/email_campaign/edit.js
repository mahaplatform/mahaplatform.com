import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    card: PropTypes.object,
    panel: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { card, panel } = this.props
    return {
      title: 'Edit Card',
      endpoint: `/api/admin/dashboard/panels/${panel.id}/cards/${card.id}/edit`,
      action: `/api/admin/dashboard/panels/${panel.id}/cards/${card.id}`,
      method: 'patch',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Email Campaign', name: 'config.campaign_id', type: 'lookup', endpoint: '/api/admin/crm/campaigns/email', value: 'id', text: 'title', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(organizer) {
    this.context.modal.close()
  }

}

export default Edit
