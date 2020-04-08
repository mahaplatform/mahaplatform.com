import { Button, Loader, Payment } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class Step4 extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    event: PropTypes.object,
    total: PropTypes.number,
    onSubmit: PropTypes.func,
    onDone: PropTypes.func
  }

  render() {
    return (
      <div className="registration-panel">
        <div className="registration-panel-body">
          <div className="registration-panel-content">
            <div className="registration-step4">
              <Payment { ...this._getPayment() } />
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getPayment() {
    const { data, event, total, onDone } = this.props
    return {
      amount: total,
      data,
      endpoint: `/api/events/events/${event.code}/registrations`,
      program: event.program,
      settings: event.settings,
      token: '',
      onSuccess: onDone
    }
  }

}

export default Step4
