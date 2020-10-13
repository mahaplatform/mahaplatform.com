import { ModalPanel, Message, ProgressPie } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Process extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    _import: PropTypes.object,
    onDone: PropTypes.func
  }

  state = {
    progress: null,
    status: 'processing'
  }

  _handleFailure = this._handleFailure.bind(this)
  _handleProcessed = this._handleProcessed.bind(this)
  _handleProgress = _.throttle(this._handleProgress.bind(this), 150)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { status } = this.state
    return (
      <ModalPanel { ...this._getPanel() }>
        { status === 'processing' &&
          <ProgressPie { ...this._getProgress() } />
        }
        { status === 'success' &&
          <Message { ...this._getSuccess() } />
        }
        { status === 'failure' &&
          <Message { ...this._getFailure() } />
        }
      </ModalPanel>
    )
  }

  componentDidMount() {
    this._handleProcess()
  }

  _getFailure() {
    return {
      title: 'Import Failed',
      text: 'Oh no! Your data was not imported successfully. Please double-check your spreadsheet and try again or ask for help from support@mahaplatform.com.',
      icon: 'warning',
      color: 'red',
      animation: 'shake'
    }
  }

  _getPanel() {
    return {
      title: 'Importing Contacts'
    }
  }

  _getProgress() {
    const { progress } = this.state
    return {
      percent: progress ? (progress.completed/ progress.total) * 100 : 0,
      title: 'Importing Contacts',
      label: progress ? `${progress.completed}/${progress.total}` : ''
    }
  }

  _handleFailure(err) {
    this.setState({
      status: 'failure'
    })
  }

  _handleJoin() {
    const { network } = this.context
    const { _import } = this.state
    const target = `/admin/imports/${_import.id}`
    network.join(target)
    network.subscribe([
      { target, action: 'progress', handler: this._handleProgress },
      { target, action: 'success', handler: this._handleSuccess },
      { target, action: 'failed', handler: this._handleFailure }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { _import } = this.state
    const target = `/admin/imports/${_import.id}`
    network.leave(target)
    network.unsubscribe([
      { target, action: 'progress', handler: this._handleProgress },
      { target, action: 'success', handler: this._handleSuccess },
      { target, action: 'failed', handler: this._handleFailure }
    ])
  }

  _handleProcess() {
    const { _import } = this.props
    this.context.network.request({
      endpoint: `/api/admin/crm/imports/${_import.id}/process`,
      method: 'patch',
      onSuccess: this._handleProcessed
    })
  }

  _handleProcessed(result) {
    const _import = result.data
    this.setState({ _import })
    this._handleJoin()
  }

  _handleProgress(progress){
    this.setState({ progress })
  }

  _handleSuccess(imp) {
    this.props.onDone()
  }

}

export default Process
