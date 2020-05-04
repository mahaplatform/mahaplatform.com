import Attachments from '../attachments'
import PropTypes from 'prop-types'
import Camera from '../camera'
import Editor from './editor'
import React from 'react'

class Composer extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    attachments: PropTypes.array,
    link: PropTypes.object,
    placeholder: PropTypes.string,
    quoted: PropTypes.object,
    text: PropTypes.string,
    onAddAttachments: PropTypes.func,
    onAddLink: PropTypes.func,
    onRemoveAttachment: PropTypes.func,
    onRemoveLink: PropTypes.func,
    onSubmit: PropTypes.func,
    onUpdateAttachment: PropTypes.func,
    onUpdateText: PropTypes.func
  }

  static defaultProps = {
    attachments: [],
    link: null,
    placeholder: 'Enter text',
    quoted: null,
    text: ''
  }

  _handleAttachments = this._handleAttachments.bind(this)

  render() {
    return (
      <div className="maha-composer">
        <div className="maha-composer-attachments-icon" onClick={ this._handleAttachments }>
          <i className="fa fa-plus-circle" />
        </div>
        <div className="maha-composer-input">
          <Editor { ...this._getEditor() } />
        </div>
        <div className="maha-composer-camera">
          <Camera { ...this._getCamera() } />
        </div>
      </div>
    )
  }

  _getAttachments() {
    const { onAddAttachments } = this.props
    return {
      prompt: 'Upload File(s)',
      onChooseAssets: onAddAttachments,
      multiple: true
    }
  }

  _getCamera() {
    const { onAddAttachments, onUpdateAttachment } = this.props
    return {
      icon: 'camera',
      onAddAsset: onAddAttachments,
      onUpdateAsset: onUpdateAttachment
    }
  }

  _getEditor() {
    return this.props
  }

  _handleAttachments() {
    this.context.modal.open(<Attachments { ...this._getAttachments() } />)
  }

}

export default Composer
