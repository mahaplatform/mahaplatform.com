import sections from '../sections'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    platform: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    fields: PropTypes.array
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Organization',
      method: 'post',
      action: '/api/admin/crm/organizations',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: this._getSections()
    }
  }

  _getSections() {
    const { fields } = this.props
    const results = sections(fields)
    results[0].fields = [
      { label: 'Name', name: 'name', type: 'textfield' },
      { label: 'Logo', name: 'logo_id', type: 'filefield', prompt: 'Choose Logo', action: '/api/admin/assets/upload', endpoint: '/api/admin/assets', multiple: false },
      ...results[0].fields
    ]
    return results
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.history.push(`/admin/crm/organizations/${result.id}`)
    this.context.modal.close()
  }

}

export default New
