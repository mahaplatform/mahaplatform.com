import PropTypes from 'prop-types'
import Summary from './summary'
import Methods from './methods'
import React from 'react'

class Payment extends React.Component {

  static propTypes = {
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
    const { token, onPayment } = this.props
    return {
      token,
      onSuccess: onPayment
    }
  }

  _getSummary() {
    return this.props.summary
  }

}

export default Payment
