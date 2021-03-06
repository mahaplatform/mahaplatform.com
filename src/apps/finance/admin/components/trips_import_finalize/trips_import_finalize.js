import { ModalPanel, ProgressPie } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class TripsImportFinalize extends React.Component {

  static contextTypes = {
    network:PropTypes.object,
    admin: PropTypes.object,
    modal: PropTypes.object,
    platform: PropTypes.object
  }

  static propTypes = {
    import: PropTypes.object,
    progress: PropTypes.object,
    status: PropTypes.string,
    onDone: PropTypes.func,
    onFinalizeTrips: PropTypes.func,
    onUpdateProgress: PropTypes.func,
    onSuccess: PropTypes.func,
    onFail: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)
  _handleProgress = _.throttle(this._handleProgress.bind(this), 150)
  _handleSuccess = this._handleSuccess.bind(this)
  _handleFailure = this._handleFailure.bind(this)

  render() {
    const imp = this.props.import
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="import-finalize">
          { imp &&
            <ProgressPie { ...this._getProgress() } />
          }
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this.props.onFinalizeTrips(this.props.import.id)
  }

  componentDidUpdate(prevProps) {
    const { status, onDone } = this.props
    if( prevProps.status !== status ){
      if( status === 'finalizing' ){
        this._handleJoin()
      } else if( status === 'failure' ) {
        this._handleLeave()
      } else if( status === 'success' ) {
        this._handleLeave()
        onDone()
      }
    }
  }

  _getPanel() {
    const { status } = this.props
    const panel = {
      title: 'Finalize Mileage Import'
    }
    if(status === 'success') {
      panel.rightItems = [
        { label: 'Proceed', handler: this._handleDone }
      ]
    }
    return panel
  }

  _getProgress() {
    const { progress } = this.props
    return {
      percent: progress ? (progress.completed/ progress.total) * 100 : 0,
      title: 'Finalizing your import',
      label: progress ? `${progress.completed}/${progress.total}` : ''
    }
  }

  _handleJoin() {
    const { network } = this.context
    const target = `/admin/imports/${this.props.import.id}`
    network.join(target)
    network.subscribe([
      { target, action: 'progress', handler: this._handleProgress },
      { target, action: 'success', handler: this._handleSuccess },
      { target, action: 'failed', handler: this._handleFailure }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const target = `/admin/imports/${this.props.import.id}`
    network.leave(target)
    network.unsubscribe([
      { target, action: 'progress', handler: this._handleProgress },
      { target, action: 'success', handler: this._handleSuccess },
      { target, action: 'failed', handler: this._handleFailure }
    ])
  }

  _handleProgress(progress){
    this.props.onUpdateProgress(progress)
  }

  _handleSuccess(imp) {
    this.props.onSuccess(imp)
  }

  _handleFailure(err) {
    this.props.onFail(err)
  }

  _handleDone() {
    const { onDone } = this.props
    onDone(this.props.import)
  }

}

export default TripsImportFinalize
