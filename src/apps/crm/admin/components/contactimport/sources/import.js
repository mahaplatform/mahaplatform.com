import { ModalPanel, ProgressPie } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Import extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    program: PropTypes.object,
    params: PropTypes.object,
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
      title: 'Analyzing Data'
    }
  }

  _getProgress() {
    const { progress } = this.state
    return {
      percent: progress ? (progress.completed/ progress.total) * 100 : 0,
      title: 'Analyzing Data',
      label: progress ? `${progress.completed}/${progress.total}` : ''
    }
  }

  _handleCreate() {
    const { params, program } = this.props
    this.context.network.request({
      endpoint: '/api/admin/crm/imports',
      method: 'post',
      body: {
        program_id: program.id,
        ...params
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

  _handleProgress(progress){
    this.setState({ progress })
  }

  _handleSuccess(imp) {
    this.props.onDone(imp)
  }

}

export default Import
