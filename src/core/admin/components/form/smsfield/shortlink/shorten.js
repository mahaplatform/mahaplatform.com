import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Shorten extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    url: PropTypes.string,
    onDone: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { url } = this.props
    return {
      title: 'Shorten Link',
      method: 'post',
      action: '/api/admin/shortlinks',
      saveText: 'Shorten',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'URL', name: 'url', type: 'textfield',  placeholder: 'http://example.com', defaultValue: url }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.props.onDone(result)
    this.context.modal.close()
  }

}
export default Shorten
