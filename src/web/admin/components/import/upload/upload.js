import Attachments from '../../attachments'
import Message from '../../message'
import Loader from '../../loader'
import React from 'react'
import PropTypes from 'prop-types'

class Upload extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    import: PropTypes.object,
    status: PropTypes.string,
    table: PropTypes.string,
    onBack: PropTypes.func,
    onCreateImport: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleAttachment = this._handleAttachment.bind(this)
  _handleCancel = this._handleCancel.bind(this)

  render() {
    const { status } = this.props
    if(status === 'loading') return <Loader { ...this._getLoader() } />
    if(status === 'failure') return <Message { ...this._getFailure() } />
    if(status === 'success') return null
    return <Attachments { ...this._getAttachments() } />
  }

  componentDidUpdate(prevProps) {
    const { status, onDone } = this.props
    if(status !== prevProps.status && status === 'success') {
      onDone(this.props.import)
    }
  }

  _getAttachments() {
    return {
      allow: {
        content_types: ['application/vnd.google-apps.spreadsheet'],
        extensions: ['csv','tsv','xls','xlsx'],
        types: ['files']
      },
      cancelIcon: 'chevron-left',
      onCancel: this._handleCancel,
      doneText: 'Next',
      onDone: this._handleAttachment
    }
  }

  _getLoader() {
    return {
      label: 'Analyzing your data...'
    }
  }

  _getFailure() {
    return {
      icon: 'exclamation-triangle',
      title: 'Upload failed',
      text: 'Unable to process your file'
    }
  }

  _handleCancel() {
    this.props.onBack()
  }

  _handleAttachment(asset) {
    const { table } = this.props
    this.props.onCreateImport({
      object_type: table,
      asset_id: asset.id,
      stage: 'previewing'
    })
  }

}

export default Upload
