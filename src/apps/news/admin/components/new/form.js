import { Attachments, Avatar, Camera, ComposerEditor, Logo, ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Scope from './scope'
import React from 'react'
import _ from 'lodash'

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
    link: null,
    scope: 'newsfeed',
    text: '',
    user: null
  }

  _handleAddAttachments = this._handleAddAttachments.bind(this)
  _handleAddLink = this._handleAddLink.bind(this)
  _handleAttachments = this._handleAttachments.bind(this)
  _handleAttachmentsDone = this._handleAttachmentsDone.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleRemoveAttachment = this._handleRemoveAttachment.bind(this)
  _handleRemoveLink = this._handleRemoveLink.bind(this)
  _handleScope = this._handleScope.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleUpdateAttachment = this._handleUpdateAttachment.bind(this)
  _handleUpdateScope = this._handleUpdateScope.bind(this)
  _handleUpdateText = this._handleUpdateText.bind(this)

  render() {
    const { group, scope, user } = this.state
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
              <Avatar user={ admin.user } presence={ false } />
            </div>
            <div className="news-form-header-label">
              { admin.user.full_name }
            </div>
          </div>
          <div className="news-form-body">
            <ComposerEditor { ...this._getComposerEditor() } />
          </div>
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
      onDone: this._handleAttachmentsDone
    }
  }

  _getComposerEditor() {
    const { attachments, link, text } = this.state
    return {
      attachments,
      link,
      placeholder: 'What\'s on your mind?',
      submitOnEnter: false,
      text,
      onAddAttachments: this._handleAddAttachments,
      onAddLink: this._handleAddLink,
      onRemoveAttachment: this._handleRemoveAttachment,
      onRemoveLink: this._handleRemoveLink,
      onSubmit: this._handleSubmit,
      onUpdateAttachment: this._handleUpdateAttachment,
      onUpdateText: this._handleUpdateText
    }
  }

  _getCamera() {
    return {
      icon: 'camera',
      onAddAsset: this._handleAddAttachments,
      onUpdateAsset: this._handleUpdateAttachment
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

  _handleAddAttachments(attachments) {
    this.setState({
      attachments: [
        ...this.state.attachments,
        ..._.castArray(attachments)
      ]
    })
  }

  _handleAddLink(link) {
    this.setState({ link })
  }

  _handleAttachments() {
    this.props.onPush(Attachments, this._getAttachments())
  }

  _handleAttachmentsDone(attachments) {
    this._handleAddAttachments(attachments)
    this.props.onPop()
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleRemoveAttachment(index) {
    this.setState({
      attachments: [
        ...this.state.attachments.filter((attachment, i) => {
          return i !== index
        })
      ]
    })
  }

  _handleRemoveLink() {
    this.setState({
      link: null
    })
  }

  _handleScope() {
    this.props.onPush(Scope, this._getScope())
  }

  _handleSubmit() {
    const { attachments, group, link, text, user } = this.state
    const asset_ids = attachments.map(attachment => attachment.id)
    const link_id = link ? link.id : null
    const group_id = this.props.group_id || (group ? group.id : null)
    const target_user_id = this.props.user_id || (user ? user.id : null)
    this.props.onSave({ asset_ids, link_id, group_id, target_user_id, text })
  }

  _handleUpdateAttachment(uniqueIdentifier, asset) {
    this.setState({
      attachments: [
        ...this.state.attachments.map(attachment => {
          const { file } = attachment
          return (file && file.uniqueIdentifier === uniqueIdentifier) ? {
            file: attachment.file,
            ...asset
          } : attachment
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
