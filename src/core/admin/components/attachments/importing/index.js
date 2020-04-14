import { processed, retry } from '../selectors'
import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Multiple from './multiple'
import Button from '../../button'
import pluralize from 'pluralize'
import Single from './single'
import React from 'react'

class Importing extends React.Component {

  static contextTypes = {
    uploader: PropTypes.object
  }

  static propTypes = {
    files: PropTypes.array,
    multiple: PropTypes.bool,
    processed: PropTypes.bool,
    retry: PropTypes.bool,
    onBack: PropTypes.func,
    onCreate: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleRetry = this._handleRetry.bind(this)

  render() {
    const { multiple, retry } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        { retry &&
          <div className="maha-attachments-retry">
            <i className="fa fa-exclamation-triangle" /> One or more of your file imports failed! <Button { ...this._getRetry() } />
          </div>
        }
        { multiple ? <Multiple /> : <Single /> }
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { files, onCreate } = this.props
    const { uploader } = this.context
    files.map((file, index) => {
      if(!file.create) return
      const { endpoint, body } = file.create
      onCreate(endpoint, body, index)
    })
    uploader.upload()
  }

  componentDidUpdate(prevProps) {
    const { processed } = this.props
    if(processed !== prevProps.processed) {
      this._handleDone()
    }
  }

  _getPanel() {
    const { files } = this.props
    return {
      title: `Importing ${pluralize('File', files.length)}`
    }
  }

  _getRetry() {
    return {
      label: 'Try again?',
      className: 'link',
      handler: this._handleRetry
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    this.props.onDone()
  }

  _handleRetry() {
    const { files, onCreate } = this.props
    const { uploader } = this.context
    files.map((file, index) => {
      if(file.status !== 'failed') return
      if(!file.create) return uploader.retry(file.id)
      const { endpoint, body } = file.create
      return onCreate(endpoint, body, index)
    })
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files,
  processed: processed(state.maha.attachments, props),
  retry: retry(state.maha.attachments, props)
})

export default connect(mapStateToProps)(Importing)
