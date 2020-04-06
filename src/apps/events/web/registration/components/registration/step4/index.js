import { Button, Loader, Payment } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class Step4 extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    event: PropTypes.object,
    status: PropTypes.string,
    total: PropTypes.number,
    onBack: PropTypes.func,
    onSubmit: PropTypes.func,
    onDone: PropTypes.func,
    onNext: PropTypes.func
  }

  _handleNext = this._handleNext.bind(this)

  render() {
    const { status } = this.props
    return (
      <div className="registration-panel">
        { status !== 'pending' &&
          <div className="registration-panel-message">
            <Loader label="Processing" />
          </div>
        }
        { status === 'pending' &&
          <div className="registration-panel-body">
            <div className="registration-panel-content">
              <div className="registration-step4">
                <Payment { ...this._getPayment() } />
              </div>
            </div>
          </div>
        }
        { false &&
          <div className="registration-panel-footer">
            <div className="registration-panel-footer-item">
              <Button { ...this._getBack() } />
            </div>
            <div className="registration-panel-footer-item">
              <Button { ...this._getNext() } />
            </div>
          </div>
        }
      </div>
    )
  }

  _getBack() {
    const { status, onBack } = this.props
    return {
      label: '&laquo; Back',
      color: 'red',
      disabled: status !== 'pending',
      handler: onBack
    }
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

  _getNext() {
    const { status, onSubmit } = this.props
    return {
      label: 'Next &raquo;',
      color: 'red',
      disabled: status !== 'pending',
      handler: onSubmit
    }
  }

  _handleNext() {
    this.props.onSubmit()
  }


}

export default Step4
