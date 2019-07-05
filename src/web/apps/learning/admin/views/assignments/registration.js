import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

import moment from 'moment'

const OfferingToken = (offering) => (
  <div className="learning-offering-token">
    <strong>{ moment(offering.date).format('dddd, MMMM DD, YYYY').toUpperCase() }</strong><br />
    <strong>Time:</strong> { moment(`2019-01-01 ${offering.starts_at}`).format('h:mm A') } - { moment(`2019-01-01 ${offering.ends_at}`).format('h:mm A') }<br />
    <strong>Facilitator:</strong> {offering.facilitator }<br />
    <strong>Location:</strong> {offering.location }<br />
    <span className="alert">3 seats remaining</span>
  </div>
)

OfferingToken.propTypes = {
  offering: PropTypes.object
}

class Registration extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    assignment: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { assignment } = this.props
    return {
      title: 'Registration',
      method: 'patch',
      endpoint: `/api/admin/learning/assignments/${assignment.id}/edit`,
      action: `/api/admin/learning/assignments/${assignment.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'offering_id', type: 'radiogroup', prompt: 'Choose a training', endpoint: `/api/admin/learning/trainings/${assignment.training.id}/offerings`, value: 'id', text: 'title', format: OfferingToken }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Registration
