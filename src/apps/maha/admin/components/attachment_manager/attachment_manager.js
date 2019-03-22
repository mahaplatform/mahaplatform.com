import Attachment from './attachment'
import PropTypes from 'prop-types'
import DropZone from '../dropzone'
import pluralize from 'pluralize'
import Camera from '../camera'
import React from 'react'
import _ from 'lodash'

class AttachmentManager extends React.Component {

  static propTypes = {
    attachments: PropTypes.array,
    attachment: PropTypes.object,
    caption: PropTypes.string,
    captions: PropTypes.object,
    saveable: PropTypes.bool,
    selected: PropTypes.number,
    onAddAsset: PropTypes.func,
    onCreate: PropTypes.func,
    onRemove: PropTypes.func,
    onRemoveAll: PropTypes.func,
    onSelect: PropTypes.func,
    onType: PropTypes.func,
    onUpdate: PropTypes.func,
    onUpdateAsset: PropTypes.func
  }

  static defaultProps = {
    onRemove: () => {}
  }

  caption = null

  _handleCameraAdd = this._handleCameraAdd.bind(this)
  _handleCameraUpdate = this._handleCameraUpdate.bind(this)
  _handleCreate = this._handleCreate.bind(this)
  _handleDropZoneAdd = this._handleDropZoneAdd.bind(this)
  _handleDropZoneUpdate = this._handleDropZoneUpdate.bind(this)
  _handleRemoveAll = this._handleRemoveAll.bind(this)
  _handleUpdate = _.debounce(this._handleUpdate.bind(this), 250, { trailing: true })

  render() {
    const { attachment, attachments, saveable } = this.props
    return (
      <div className="maha-attachment-manager">
        <DropZone { ...this._getDropZone() }>
          <div className="maha-attachment-manager-widget">
            <div className="maha-attachment-manager-main">
              <div className="maha-attachment-manager-removeall" onClick={ this._handleRemoveAll }>
                <i className="fa fa-fw fa-times" />
              </div>
              <Attachment attachment={ attachment } />
              <div className="maha-attachment-manager-controls">
                <div className="maha-attachment-manager-button">
                  <div className="ui circular icon button">
                    <Camera { ...this._getCamera() } />
                  </div>
                </div>
                <div className="maha-attachment-manager-caption">
                  <input type="text" placeholder="Enter a caption" ref={ node => this.caption = node } key={`caption_${attachment.asset.identifier}`} defaultValue={ attachment.caption } onChange={ this._handleUpdate } />
                </div>
                <div className="maha-attachment-manager-button">
                  { saveable ?
                    <div className="ui blue circular icon button" onClick={ this._handleCreate }>
                      <i className="fa fa-paper-plane" />
                    </div> :
                    <div className="ui blue circular icon button disabled" title={ `Uploading ${pluralize('attachment', attachments.length, true)}` }>
                      <i className="fa fa-paper-plane" />
                    </div>
                  }
                </div>
              </div>
            </div>
            { attachments.length > 1 &&
              <div className="maha-attachment-manager-thumbnails">
                { attachments.map((attachment, index) => (
                  <Attachment { ...this._getAttachment(attachment, index) } key={`thumbanil_${attachment.asset.identifier || attachment.asset.id}`} />
                ))}
              </div>
            }
          </div>
        </DropZone>
      </div>
    )
  }

  _getAttachment(attachment, index) {
    return {
      attachment,
      onClick: this._handleClick.bind(this, index),
      onRemove: this._handleRemove.bind(this, index),
      transforms: { fit: 'cover', w: 300, h: 300 }
    }
  }

  _getCamera() {
    return {
      icon: 'plus',
      onAdd: this._handleCameraAdd,
      onUpdate: this._handleCameraUpdate
    }
  }

  _getDropZone() {
    return {
      onAdd: this._handleDropZoneAdd,
      onUpdate: this._handleDropZoneUpdate
    }
  }

  _handleCameraAdd(asset) {
    this.props.onAddAssets([asset])
  }

  _handleCameraUpdate(identifier, asset) {
    this.props.onUpdateAsset(identifier, asset)
  }

  _handleClick(selected) {
    this.props.onSelect(selected)
  }

  _handleCreate() {
    const { saveable } = this.props
    if(!saveable) return
    this.props.onCreate('')
  }

  _handleDropZoneAdd(assets) {
    this.props.onAddAssets(assets)
  }

  _handleDropZoneUpdate(identifier, asset) {
    this.props.onUpdateAsset(identifier, asset)
  }

  _handleRemove(index) {
    const previous = index > 0 ? index - 1 : 0
    this.props.onSelect(previous)
    this.props.onRemove(index)
  }

  _handleRemoveAll() {
    this.props.onRemoveAll()
  }

  _handleUpdate() {
    const { attachment } = this.props
    const identifier = attachment.asset.identifier
    this.props.onUpdate(identifier, { caption: this.caption.value })
  }

}

export default AttachmentManager
