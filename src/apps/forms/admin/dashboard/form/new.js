import PropTypes from 'prop-types'
import { Form } from '@admin'
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
            { name: 'type', type: 'hidden', value: 'form' },
            { label: 'Form', name: 'config.form_id', type: 'lookup', endpoint: '/api/admin/forms/forms', value: 'id', text: 'title', required: true }
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
