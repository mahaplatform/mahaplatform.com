import { AssetIcon, Attachments, Avatar, Composer, Image } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Form extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    attachments: PropTypes.array,
    text: PropTypes.string,
    onAddAttachments: PropTypes.func,
    onRemoveAttachment: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func
  }

  _handleAddAttachments = this._handleAddAttachments.bind(this)
  _handleAssets = this._handleAssets.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { admin } = this.context
    const { attachments } = this.props
    return (
      <div className="news-form">
        <div className="news-form-body">
          <div className="news-form-avatar">
            <Avatar user={ admin.user } />
          </div>
          <div className="news-form-input">
            <Composer { ...this._getComposer() } />
          </div>
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
          <button className="ui tiny red button" onClick={ this._handleSubmit }>Post</button>
        </div>
      </div>
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
    return {
      prompt: 'Upload File(s)',
      onChooseAssets: this._handleAssets
    }
  }

  _handleChange(text) {
    this.props.onSet(text)
  }

  _handleAssets(assets) {
    this.props.onAddAttachments(assets)
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

}

export default Form
