import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import sections from './sections'
import React from 'react'
import _ from 'lodash'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    site_id: PropTypes.string,
    fields: PropTypes.array,
    type: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { site_id, fields, type } = this.props
    return {
      title: `New ${_.startCase(type.name)}`,
      method: 'post',
      action: `/api/admin/sites/sites/${site_id}/types/${type.id}/items`,
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

export default New
