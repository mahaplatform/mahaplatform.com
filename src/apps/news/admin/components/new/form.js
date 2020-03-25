import { AssetIcon, Attachments, Avatar, Camera, Image, ImagePreview, Logo, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import TextArea from './textarea'
import Scope from './scope'
import React from 'react'

class Form extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    group_id: PropTypes.number,
    text: PropTypes.string,
    user_id: PropTypes.number,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onSave: PropTypes.func
  }

  state = {
    attachments: [],
    group: null,
    scope: 'newsfeed',
    text: '',
    user: null
  }

  _handleAddAsset = this._handleAddAsset.bind(this)
  _handleAddAttachments = this._handleAddAttachments.bind(this)
  _handleAttachments = this._handleAttachments.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleScope = this._handleScope.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleUpdateAsset = this._handleUpdateAsset.bind(this)
  _handleUpdateScope = this._handleUpdateScope.bind(this)
  _handleUpdateText = this._handleUpdateText.bind(this)

  render() {
    const { attachments, group, scope, user } = this.state
    const { group_id, user_id } = this.props
    const { admin } = this.context
    return (
      <ModalPanel { ...this._getPanel()}>
        <div className="news-form">
          { (!group_id && !user_id) &&
            <div className="news-form-list-item" onClick={ this._handleScope }>
              <div className="news-form-list-item-icon">
                { scope === 'group' &&
                  <Logo team={ group } width="28" />
                }
                { scope === 'user' &&
                  <Avatar user={ user } width="24" />
                }
                { scope === 'newsfeed' &&
                  <i className="fa fa-globe" />
                }
              </div>
              <div className="news-form-list-item-label">
                { scope === 'group' &&
                  <span>Share to { group.title }</span>
                }
                { scope === 'user' &&
                  <span>Share to { user.full_name }&apos;s timeline</span>
                }
                { scope === 'newsfeed' &&
                  <span>Share to News Feed</span>
                }
              </div>
              <div className="news-form-list-item-proceed">
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
                  { asset.file ?
                    <div className="news-form-attachment-item">
                      <ImagePreview image={ asset.file } cover={ true } />
                      <div><i className="fa fa-fw fa-circle-o-notch fa-spin" /></div>
                    </div> :
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
                  }
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
      onDone: this._handleAddAttachments
    }
  }

  _getCamera() {
    return {
      icon: 'camera',
      onAddAsset: this._handleAddAsset,
      onUpdateAsset: this._handleUpdateAsset
    }
  }

  _getEmojis() {
    return {
      onChoose: this._handleInsertEmoji
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

  _getScope() {
    const { onPop, onPush } = this.props
    return {
      onPush: onPush,
      onBack: onPop,
      onChoose: this._handleUpdateScope
    }
  }

  _getTextarea() {
    const { text } = this.state
    return {
      placeholder: 'What\'s on your mind?',
      value: text,
      onChange: this._handleUpdateText,
      onAddAsset: this._handleAddAsset,
      onUpdateAsset: this._handleUpdateAsset
    }
  }

  _handleAddAsset(file) {
    this.setState({
      attachments: [
        ...this.state.attachments,
        file
      ]
    })
  }

  _handleAddAttachments(assets) {
    this.setState({
      attachments: [
        ...this.state.attachments,
        ...assets
      ]
    })
    this.props.onPop()
  }

  _handleAttachments() {
    this.props.onPush(Attachments, this._getAttachments())
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleScope() {
    this.props.onPush(Scope, this._getScope())
  }

  _handleSubmit() {
    const { attachments, group, text, user } = this.state
    const asset_ids = attachments.map(attachment => attachment.id)
    const group_id = this.props.group_id || (group ? group.id : null)
    const target_user_id = this.props.user_id || (user ? user.id : null)
    this.props.onSave({ asset_ids, group_id, target_user_id, text })
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

  _handleUpdateAsset(uniqueIdentifier, asset) {
    this.setState({
      attachments: [
        ...this.state.attachments.map(attachment => {
          const { file } = attachment
          return (file && file.uniqueIdentifier === uniqueIdentifier) ? asset : attachment
        })
      ]
    })
  }

  _handleUpdateScope({ group, user }) {
    if(group) return this.setState({ scope: 'group', group })
    if(user) return this.setState({ scope: 'user', user })
    this.setState({ scope: 'newsfeed' })
  }

  _handleUpdateText(text) {
    this.setState({ text })
  }

}

export default Form
