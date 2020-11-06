import { Loader, Payment } from '@client'
import PropTypes from 'prop-types'
import React from 'react'

class Step4 extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    event: PropTypes.object,
    token: PropTypes.string,
    total: PropTypes.number,
    onSubmit: PropTypes.func,
    onDone: PropTypes.func
  }

  render() {
    const { total } = this.props
    return (
      <div className="registration-panel">
        <div className="registration-panel-body">
          <div className="registration-panel-content">
            <div className="registration-step4">
              { total > 0 ?
                <Payment { ...this._getPayment() } /> :
                <Loader label="Processing" />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { total } = this.props
    if(total > 0) return
    this.props.onSubmit()
  }

  _getPayment() {
    const { data, event, token, total, onDone } = this.props
    return {
      amount: total,
      data,
      endpoint: `/api/events/events/${event.code}/registrations`,
      lineItems: data.items,
      program: event.program,
      settings: event.settings,
      token,
      onSuccess: onDone
    }
  }

}

export default Step4
