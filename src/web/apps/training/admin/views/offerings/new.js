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

  state = {
    starts_at: '0:00'
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { training } = this.props
    return {
      title: 'New Offering',
      method: 'post',
      action: `/api/admin/training/trainings/${training.id}/offerings`,
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date', name: 'date', type: 'datefield', required: true },
            { label: 'Start Time', name: 'starts_at', type: 'timefield', required: true },
            this._getEndsAt(),
            { label: 'Location', name: 'location', type: 'textfield', placeholder: 'Indicate where the training will occur' },
            { label: 'Facilitator', name: 'facilitator', type: 'textfield', placeholder: 'Indicate who will facilitate the training' },
            { label: 'Limit', name: 'limit', type: 'numberfield', placeholder: 'Specify the maximum number of attendees' }
          ]
        }
      ]
    }
  }

  _getEndsAt() {
    const { starts_at } = this.state
    return { label: 'End Time', name: 'ends_at', type: 'timefield', start: starts_at, required: true, duration: true }
  }

  _handleChangeField(key, value) {
    if(key !== 'starts_at') return
    this.setState({ starts_at: value })
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    const { training } = this.props
    this.context.router.push(`/admin/training/trainings/${training.id}/offerings/${result.id}`)
    this.context.modal.close()
  }

}

export default New
