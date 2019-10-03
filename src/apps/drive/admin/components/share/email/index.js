import { AssetToken, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Email extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    item: PropTypes.object,
    onBack: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { item } = this.props
    const message = `Check out this ${item.type}:\n\n${process.env.WEB_HOST}/drive/share/${item.code}`
    return {
      title: 'Share via Email',
      method: 'post',
      action: '/api/admin/drive/share/email',
      cancelText: <i className="fa fa-chevron-left" />,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      before: (
        <div className="drive-share-header">
          <AssetToken { ...item.asset } />
        </div>
      ),
      sections: [
        {
          fields: [
            { label: 'To', name: 'to', type: 'textfield', required: true },
            { label: 'Subject', name: 'subject', type: 'textfield', required: true, defaultValue: item.label },
            { label: 'Message', name: 'message', type: 'textarea', required: true, rows: 12, defaultValue: message }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.props.onBack()
  }

  _handleSuccess() {
    const { item } = this.props
    setTimeout(() => {
      this.context.flash.set('success', `The ${item.type} was successfully shared`)
    }, 500)
    this.context.modal.close()
  }

}

export default Email
