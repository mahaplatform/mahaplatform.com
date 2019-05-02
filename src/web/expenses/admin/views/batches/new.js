import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class Export extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    ids: PropTypes.array,
    token: PropTypes.string
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { ids } = this.props
    return {
      title: 'Create Batch',
      method: 'post',
      action: '/api/admin/expenses/batches',
      successText: 'Export',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            ...Object.keys(ids).map(name => (
              { name, type: 'hidden', defaultValue: ids[name] }
            )),
            { label: 'Date', name: 'date', type: 'datefield', required: true, defaultValue: moment().format('YYYY-MM-DD') }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(batch) {
    window.location.href = `/api/admin/expenses/batches/${batch.id}.csv?download=true&enclosure="&token=${this.props.token}`
    this.context.modal.close()
  }

}

export default Export
