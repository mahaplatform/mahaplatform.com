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
    onSubmit: PropTypes.func
  }

  _handleSuccess = this._handleSuccess.bind(this)

  render() {
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
    const { program, summary, token } = this.props
    return {
      program,
      token,
      summary,
      onSuccess: this._handleSuccess
    }
  }

  _getSummary() {
    return this.props.summary
  }

  _handleSuccess(method, data) {
    const { summary } = this.props
    const amount = summary.total
    this.props.onSubmit(amount, method, data)
  }

}

export default Payment
