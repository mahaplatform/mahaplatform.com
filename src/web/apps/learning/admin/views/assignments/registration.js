import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

import moment from 'moment'

const OfferingToken = ({ assignments_count, date, ends_at, facilitator, location, limit, starts_at }) => (
  <div className="learning-offering-token">
    <strong>{ moment(date).format('dddd, MMMM DD, YYYY').toUpperCase() }</strong><br />
    <strong>Time:</strong> { moment(`2019-01-01 ${starts_at}`).format('h:mm A') } - { moment(`2019-01-01 ${ends_at}`).format('h:mm A') }<br />
    <strong>Facilitator:</strong> {facilitator }<br />
    <strong>Location:</strong> {location }<br />
    { limit && assignments_count < limit &&
      <span className="alert">{ limit - assignments_count } seats remaining</span>
    }
    { limit && assignments_count === limit &&
      <span className="alert">This offering is full</span>
    }
  </div>
)

OfferingToken.propTypes = {
  assignments_count: PropTypes.number,
  date: PropTypes.string,
  ends_at: PropTypes.string,
  facilitator: PropTypes.string,
  location: PropTypes.string,
  limit: PropTypes.number,
  starts_at: PropTypes.string
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
