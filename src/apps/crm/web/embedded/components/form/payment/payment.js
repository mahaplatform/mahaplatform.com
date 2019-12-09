import PropTypes from 'prop-types'
import Summary from './summary'
import Methods from './methods'
import React from 'react'

class Payment extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    summary: PropTypes.object,
    token: PropTypes.string,
    onFetch: PropTypes.func,
    onPayment: PropTypes.func
  }

  render() {
    if(!this.props.token) return null
    return (
      <div className="maha-payment">
        <Summary { ...this._getSummary() } />
        <Methods { ...this._getMethods() } />
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetch()
  }

  _getMethods() {
    const { program, summary, token, onPayment } = this.props
    return {
      program,
      token,
      summary,
      onSuccess: onPayment
    }
  }

  _getSummary() {
    return this.props.summary
  }

}

export default Payment
