import { AssetIcon, Attachments, Avatar, Image, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Privacy from './privacy'

class New extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    attachments: PropTypes.array,
    text: PropTypes.string,
    onAddAttachments: PropTypes.func,
    onCancel: PropTypes.func,
    onRemoveAttachment: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func
  }

  state = {
    config: {}
  }

  _handleAddAttachments = this._handleAddAttachments.bind(this)
  _handleAssets = this._handleAssets.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handlePrivacy = this._handlePrivacy.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { admin } = this.context
    const { attachments } = this.props
    const group = this._getGroup()
    return (
      <ModalPanel { ...this._getPanel()}>
        <div className="news-form">
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
          <div className="news-form-header">
            <div className="news-form-header-avatar">
              <Avatar user={ admin.user } />
            </div>
            <div className="news-form-header-label">
              { admin.user.full_name }
            </div>
          </div>
          <div className="news-form-body">
            <textarea placeholder="Whats on your mind?"></textarea>
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
                <div className="news-form-attachment-add" onClick={ this._handleAddAttachments }>
                  <i className="fa fa-fw fa-plus" />
                </div>
              </div>
            </div>
          }
          <div className="news-form-footer">
            <div className="news-form-footer-item" onClick={ this._handleAttachments.bind(this) }>
              <i className="fa fa-plus" />
            </div>
            <div className="news-form-footer-item">
              <i className="fa fa-camera" />
            </div>
            <div className="news-form-footer-item">
              <i className="fa fa-smile-o" />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getComposer() {
    return {
      icon: null,
      placeholder: 'Post an announcement...',
      onSubmit: this._handleSubmit,
      onChooseAssets: this._handleAssets,
      onChange: this._handleChange
    }
  }

  _getAttachments() {
    const { onPop } = this.props
    return {
      cancelText: <i className="fa fa-chevron-left" />,
      prompt: 'Upload File(s)',
      onCancel: onPop,
      onChooseAssets: this._handleAssets
    }
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

  _getGroup() {
    const { config } = this.state
    const { group } = config
    if(!group) return { id: null, icon: 'globe', title: 'Everyone' }
    return group
  }

  _getPrivacy() {
    const { onPop } = this.props
    return {
      onBack: onPop,
      onChoose: this._handleUpdate.bind(this, 'group')
    }
  }

  _handleAssets(assets) {
    this.props.onAddAttachments(assets)
  }

  _handleAttachments() {
    this.props.onPush(Attachments, this._getAttachments())
  }

  _handleChange(text) {
    this.props.onSet(text)
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handlePrivacy() {
    this.props.onPush(Privacy, this._getPrivacy())
  }

  _handleSubmit() {
    const { attachments, text, onSave } = this.props
    const asset_ids = attachments.map(attachment => attachment.id)
    onSave({ text, asset_ids })
  }

  _handleAddAttachments(index) {
    this.context.modal.open(<Attachments { ...this._getAttachments() } />)
  }

  _handleRemoveAttachment(index) {
    this.props.onRemoveAttachment(index)
  }

  _handleUpdate(key, value) {
    const { config } = this.state
    this.setState({
      config: {
        ...config,
        [key]: value
      }
    })
  }

}

export default New
