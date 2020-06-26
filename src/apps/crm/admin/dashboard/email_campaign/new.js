import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    panel: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { panel } = this.props
    return {
      title: 'New Card',
      action: `/api/admin/dashboard/panels/${panel.id}/cards`,
      method: 'post',
      cancelIcon: 'chevron-left',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'type', type: 'hidden', value: 'email_campaign' },
            { label: 'Email Campaign', name: 'config.campaign_id', type: 'lookup', endpoint: '/api/admin/crm/campaigns/email', value: 'id', text: 'title', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.props.onBack()
  }

  _handleSuccess(organizer) {
    this.props.onDone()
  }

}

export default New
