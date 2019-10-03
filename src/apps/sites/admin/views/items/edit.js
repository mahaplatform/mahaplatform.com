import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import sections from './sections'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    site_id: PropTypes.string,
    fields: PropTypes.array,
    id: PropTypes.number,
    type: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { site_id, fields, id, type } = this.props
    return {
      title: `Edit ${type.title}`,
      method: 'PATCH',
      action: `/api/admin/sites/sites/${site_id}/types/${type.id}/items/${id}`,
      endpoint: `/api/admin/sites/sites/${site_id}/types/${type.id}/items/${id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: sections(fields)
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Edit
