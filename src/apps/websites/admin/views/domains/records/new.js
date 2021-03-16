import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    domain: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { domain } = this.props
    return {
      title: 'New Record',
      method: 'post',
      action: `/api/admin/websites/domains/${domain.id}/records`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield', suffix: `.${domain.name}` },
            { label: 'Type', name: 'type', type: 'dropdown', options: ['A','CNAME','MX','TXT'], required: true },
            { label: 'Value', name: 'value', type: 'textfield', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default New
