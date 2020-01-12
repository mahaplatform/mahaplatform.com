import { ModalPanel, ProgressPie } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Import extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    source: PropTypes.object,
    list_id: PropTypes.string,
    onDone: PropTypes.func
  }

  state = {
    _import: null,
    progress: null
  }

  _handleCreated = this._handleCreated.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleFailure = this._handleFailure.bind(this)
  _handleProgress = _.throttle(this._handleProgress.bind(this), 150)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="import-parsing">
          <ProgressPie { ...this._getProgress() } />
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this._handleCreate()
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

  _handleCreate() {
    const { source, list_id } = this.props
    this.context.network.request({
      endpoint: '/api/admin/crm/imports',
      method: 'post',
      body: {
        profile_id: source.id,
        list_id
      },
      onSuccess: this._handleCreated
    })
  }

  _handleCreated(result) {
    const _import = result.data
    this.setState({ _import })
    this._handleJoin()
  }

  _handleDone() {
    const { _import } = this.state
    this.props.onDone(_import)
  }

  _handleFailure(err) {
  }

  _handleJoin() {
    const { network } = this.context
    const { _import } = this.state
    const channel = `/admin/imports/${_import.id}`
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'progress', handler: this._handleProgress },
      { target: channel, action: 'success', handler: this._handleSuccess },
      { target: channel, action: 'failed', handler: this._handleFailure }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { _import } = this.state
    const channel = `/admin/imports/${_import.id}`
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'progress', handler: this._handleProgress },
      { target: channel, action: 'success', handler: this._handleSuccess },
      { target: channel, action: 'failed', handler: this._handleFailure }
    ])
  }

  _handleProgress(progress){
    this.setState({ progress })
  }

  _handleSuccess(imp) {
    this.props.onDone(imp)
  }

}

export default Import
