import { Loader, Payment } from '@client'
import PropTypes from 'prop-types'
import React from 'react'

class Step4 extends React.Component {

  static contextTypes = {
    analytics: PropTypes.object
  }

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
    this.context.analytics.trackPageView('Step 4 - Payment Information')
    if(total > 0) return
    this.props.onSubmit()
  }

  _getPayment() {
    const { data, event, token, total, onDone } = this.props
    return {
      amount: total,
      data,
      endpoint: `/api/events/events/${event.code}/registrations`,
      lineItems: data.items.map(item => ({
        ...item,
        name: `${event.program.title} - ${event.title} - ${item.name}`
      })),
      program: event.program,
      settings: event.settings,
      token,
      onSuccess: onDone
    }
  }

}

export default Step4
