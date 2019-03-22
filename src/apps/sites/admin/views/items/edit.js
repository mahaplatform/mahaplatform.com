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
    token: PropTypes.string,
    type: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { site_id, fields, id, token, type } = this.props
    return {
      title: `Edit ${type.title}`,
      method: 'PATCH',
      action: `/api/admin/sites/sites/${site_id}/types/${type.id}/items/${id}`,
      endpoint: `/api/admin/sites/sites/${site_id}/types/${type.id}/items/${id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: sections(fields, token)
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(Edit)
