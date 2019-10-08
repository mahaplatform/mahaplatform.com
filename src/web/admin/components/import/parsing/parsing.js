import Message from '../../message'
import ModalPanel from '../../modal_panel'
import ProgressPie from '../../progress/pie'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Parsing extends React.Component {

  static contextTypes = {
    network:PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    error: PropTypes.string,
    import: PropTypes.object,
    primaryKey: PropTypes.string,
    progress: PropTypes.object,
    table: PropTypes.string,
    status: PropTypes.string,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onFail: PropTypes.func,
    onInit: PropTypes.func,
    onParse: PropTypes.func,
    onSuccess: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleProgress = _.throttle(this._handleProgress.bind(this), 150)
  _handleSuccess = this._handleSuccess.bind(this)
  _handleFailure = this._handleFailure.bind(this)

  render() {
    const { status } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="import-parsing">
          { status === 'parsing' &&
            <ProgressPie { ...this._getProgress() } />
          }
          { status === 'failure' &&
            <Message { ...this._getErrorMessage() } />
          }
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { rules, defaultValue, primaryKey, table  } = this.props
    this.props.onInit( defaultValue )
    this.props.onParse( defaultValue.id, { rules, primaryKey, table })
  }

  componentDidUpdate(prevProps) {
    const { status, onDone } = this.props
    if( prevProps.status !== status ){
      if( status === 'parsing' ){
        this._handleJoin()
      } else if( status === 'failure' ) {
        this._handleLeave()
      } else if( status === 'success' ) {
        this._handleLeave()
        onDone( this.props.import )
      }
    }
  }

  _getPanel() {
    const { status } = this.props
    const panel = {
      title: 'Parsing Import',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
    if(status === 'ready') {
      panel.rightItems = [
        { label: 'Next', handler: this._handleDone }
      ]
    }
    return panel
  }

  _getProgress() {
    const { progress } = this.props
    return {
      percent: progress ? (progress.completed/ progress.total) * 100 : 0,
      title: 'Parsing your import',
      label: progress ? `${progress.completed}/${progress.total}` : ''
    }
  }

  _getErrorMessage() {
    return {
      title: 'Parsing Failed',
      text: 'Oh no! Your data was not parsed successfully.',
      icon: 'warning',
      color: 'red',
      animation: 'shake'
    }
  }

  _handleJoin() {
    const { network } = this.context
    const channel = `/admin/imports/${this.props.import.id}`
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'progress', handler: this._handleProgress },
      { target: channel, action: 'success', handler: this._handleSuccess },
      { target: channel, action: 'failed', handler: this._handleFailure }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const channel = `/admin/imports/${this.props.import.id}`
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'progress', handler: this._handleProgress },
      { target: channel, action: 'success', handler: this._handleSuccess },
      { target: channel, action: 'failed', handler: this._handleFailure }
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

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Parsing
