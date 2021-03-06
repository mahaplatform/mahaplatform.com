import ModalPanel from '../../modal_panel'
import ProgressPie from '../../progress/pie'
import Message from '../../message'
import PropTypes from 'prop-types'
import React from 'react'

class Processing extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    defaultParams: PropTypes.object,
    defaultValue: PropTypes.object,
    destination: PropTypes.func,
    fields: PropTypes.array,
    import: PropTypes.object,
    progress: PropTypes.object,
    primaryKey: PropTypes.string,
    table: PropTypes.string,
    status: PropTypes.string,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onInit: PropTypes.func,
    onProcess: PropTypes.func,
    onUpdateImport: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleProgress = this._handleProgress.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)
  _handleFailure = this._handleFailure.bind(this)

  render() {
    const { status } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="import-processing">
          { status === 'processing' &&
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
    const { defaultValue, onInit, onProcess, destination, defaultParams, primaryKey, table } = this.props
    onInit( defaultValue )
    const destination_url = (destination) ? destination(defaultValue.id) : null
    onProcess( defaultValue.id, { destination_url, defaultParams, primaryKey, table } )
  }

  componentDidUpdate(prevProps) {
    const { status, onUpdateImport, onDone } = this.props
    if( prevProps.status !== status ){
      if( status === 'processing' ){
        this._handleJoin()
      } else if( status === 'failure' ) {
        onUpdateImport(this.props.import.id, { stage:'validating' })
        this._handleLeave()
      } else if( status === 'success' ) {
        this._handleLeave()
        this.props.import.stage = 'finalizing'
        onDone(this.props.import)
      }
    }
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getErrorMessage(){
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
      title: 'Processing Import',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getProgress() {
    const imp = this.props.import
    return {
      percent: (imp && imp.completed_count) ? (imp.completed_count / imp.valid_count) * 100 : 0,
      title: 'Processing your data',
      label: (imp && imp.completed_count) ? `${imp.completed_count}/${imp.valid_count}` : ''
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

  _handleProgress(imp){
    this.props.onUpdateProgress(imp)
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
    //
  }

}

export default Processing
