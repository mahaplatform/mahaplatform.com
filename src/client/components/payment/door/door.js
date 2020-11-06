import { Button } from '@client'
import PropTypes from 'prop-types'
import React from 'react'

class Door extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    data: PropTypes.object,
    endpoint: PropTypes.string,
    error: PropTypes.string,
    status: PropTypes.string,
    token: PropTypes.string,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func
  }

  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return (
      <div className="maha-payment-door">
        <Button { ...this._getButton() } />
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, status } = this.props
    if(error !== prevProps.error) {
      this.setState({ error })
    }
    if(status !== prevProps.status) {
      if(status === 'success') {
        this._handleSuccess()
      }
    }
  }

  _getButton() {
    return {
      label: 'Finish',
      color: 'blue',
      handler: this._handleSubmit
    }
  }

  _handleSubmit() {
    const { data, endpoint, token } = this.props
    this.props.onSubmit(endpoint, token, data)
  }

  _handleSuccess() {
    this.props.onSuccess()
  }

}

export default Door
