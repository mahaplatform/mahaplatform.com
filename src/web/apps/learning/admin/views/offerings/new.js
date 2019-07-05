import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    training: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { training } = this.props
    return {
      title: 'New Offering',
      method: 'post',
      action: `/api/admin/learning/trainings/${training.id}/offerings`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date', name: 'date', type: 'datefield', required: true },
            { label: 'Start Time', name: 'starts_at', type: 'timefield', required: true },
            { label: 'End Time', name: 'ends_at', type: 'timefield', required: true },
            { label: 'Location', name: 'location', type: 'textfield' },
            { label: 'Facilitator', name: 'facilitator', type: 'textfield' },
            { label: 'Limit', name: 'limit', type: 'numberfield' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    const { training } = this.props
    this.context.router.push(`/admin/learning/trainings/${training.id}/offerings/${result.id}`)
    this.context.modal.close()
  }

}

export default New
