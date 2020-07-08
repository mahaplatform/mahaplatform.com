import { connect } from 'react-redux'
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
    filter: PropTypes.object,
    token: PropTypes.string,
    type: PropTypes.string,
    onSuccess: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { filter, type } = this.props
    return {
      title: 'Create Batch',
      method: 'post',
      action: `/api/admin/finance/batches/${type}`,
      successText: 'Export',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'filter', type: 'hidden', defaultValue: filter },
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
    const { type } = this.props
    setTimeout(() => {
      window.location.href = `/api/admin/finance/batches/${type}/${batch.id}.csv?$page[limit]=0&download=true&token=${this.props.token}`
    }, 500)
    this.props.onSuccess()
    this.context.modal.close()
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team ? state.maha.admin.team.token : null
})

export default connect(mapStateToProps)(Export)
