import PropTypes from 'prop-types'
import { Form } from '@admin'
import sections from './sections'
import React from 'react'
import _ from 'lodash'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    dataset: PropTypes.object,
    fields: PropTypes.array,
    type: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { dataset, fields, type } = this.props
    return {
      title: `New ${_.startCase(type.title)}`,
      method: 'post',
      action: `/api/admin/datasets/datasets/${dataset.id}/types/${type.id}/records`,
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
