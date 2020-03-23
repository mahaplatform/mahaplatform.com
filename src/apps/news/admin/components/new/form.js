import { AssetIcon, Attachments, Avatar, Camera, Image, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import TextArea from './textarea'
import Privacy from './privacy'
import React from 'react'

class Form extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    group_id: PropTypes.number,
    text: PropTypes.string,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onSave: PropTypes.func
  }

  state = {
    attachments: [],
    group: null,
    text: ''
  }

  _handleAddAsset = this._handleAddAsset.bind(this)
  _handleAttachments = this._handleAttachments.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handlePrivacy = this._handlePrivacy.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleUpdateAttachments = this._handleUpdateAttachments.bind(this)
  _handleUpdateGroup = this._handleUpdateGroup.bind(this)
  _handleUpdateText = this._handleUpdateText.bind(this)

  render() {
    const { attachments } = this.state
    const { group_id } = this.props
    const { admin } = this.context
    const group = this._getGroup()
    return (
      <ModalPanel { ...this._getPanel()}>
        <div className="news-form">
          { !group_id &&
            <div className="news-form-privacy" onClick={ this._handlePrivacy }>
              <div className="news-form-privacy-icon">
                <i className={`fa fa-${group.icon}`} />
              </div>
              <div className="news-form-privacy-label">
                Share with { group.title }
              </div>
              <div className="news-form-privacy-proceed">
                <i className="fa fa-chevron-right" />
              </div>
            </div>
          }
          <div className="news-form-header">
            <div className="news-form-header-avatar">
              <Avatar user={ admin.user } />
            </div>
            <div className="news-form-header-label">
              { admin.user.full_name }
            </div>
          </div>
          <div className="news-form-body">
            <TextArea { ...this._getTextarea() } />
          </div>
          { attachments.length > 0 &&
            <div className="news-form-attachments">
              { attachments.map((asset, index) => (
                <div className="news-form-attachment" key={ `attachment_${index}` }>
                  <div className="news-form-attachment-item">
                    { asset.content_type.match(/image/) !== null ?
                      <div className="news-form-attachment-image">
                        <Image src={ asset.path } transforms={{ fit: 'cover', w: 100, h: 100 }} />
                      </div> :
                      <div className="news-form-attachment-file">
                        <div className="news-form-attachment-file-detail">
                          <AssetIcon { ...asset } />
                          <div className="news-form-attachment-file-name">
                            { asset.file_name}
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  <div className="news-form-attachment-remove" onClick={ this._handleRemoveAttachment.bind(this, index) }>
                    <i className="fa fa-fw fa-times" />
                  </div>
                </div>
              ))}
              <div className="news-form-attachment">
                <div className="news-form-attachment-add" onClick={ this._handleAttachments }>
                  <i className="fa fa-fw fa-plus" />
                </div>
              </div>
            </div>
          }
          <div className="news-form-footer">
            <div className="news-form-footer-item" onClick={ this._handleAttachments }>
              <i className="fa fa-plus" />
            </div>
            <div className="news-form-footer-item">
              <Camera { ...this._getCamera() } />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getAttachments() {
    const { onPop } = this.props
    return {
      cancelText: <i className="fa fa-chevron-left" />,
      multiple: true,
      prompt: 'Upload File(s)',
      onCancel: onPop,
      onDone: this._handleUpdateAttachments
    }
  }

  _getCamera() {
    return {
      icon: 'camera',
      onDone: this._handleAddAsset
    }
  }

  _getEmojis() {
    return {
      onChoose: this._handleInsertEmoji
    }
  }

  _getGroup() {
    const { group } = this.state
    if(!group) return { id: null, icon: 'globe', title: 'Everyone' }
    return group
  }

  _getPanel() {
    return {
      title: 'New Post',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      buttons: [
        { label: 'Post', color: 'blue', handler: this._handleSubmit }
      ]
    }
  }

  _getPrivacy() {
    const { onPop } = this.props
    return {
      onBack: onPop,
      onChoose: this._handleUpdateGroup
    }
  }

  _getTextarea() {
    const { text } = this.state
    return {
      placeholder: 'What\'s on your mind?',
      value: text,
      onChange: this._handleUpdateText,
      onAddAsset: this._handleAddAsset
    }
  }

  _handleAddAsset(asset) {
    this.setState({
      attachments: [
        ...this.state.attachments,
        asset
      ]
    })
  }

  _handleAttachments() {
    this.props.onPush(Attachments, this._getAttachments())
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handlePrivacy() {
    this.props.onPush(Privacy, this._getPrivacy())
  }

  _handleSubmit() {
    const { attachments, group, text } = this.state
    const asset_ids = attachments.map(attachment => attachment.id)
    const group_id = this.props.group_id || (group ? group.id : null)
    this.props.onSave({ asset_ids, group_id, text })
  }

  _handleRemoveAttachment(index) {
    const { attachments } = this.state
    this.setState({
      attachments: [
        ...attachments.filter((attachment, i) => {
          return i !== index
        })
      ]
    })
  }

  _handleUpdateAttachments(assets) {
    this.setState({
      attachments: [
        ...this.state.attachments,
        ...assets
      ]
    })
    this.props.onPop()
  }

  _handleUpdateGroup(group) {
    this.setState({ group })
  }

  _handleUpdateText(text) {
    this.setState({ text })
  }

}

export default Form
