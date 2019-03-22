import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    token: PropTypes.string
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { token } = this.props
    return {
      title: 'New Offering',
      method: 'post',
      action: '/api/admin/eatfresh/offerings',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Photo', name: 'photo_id', type: 'filefield', prompt: 'Choose Photo', action: '/api/admin/assets/upload', endpoint: '/api/admin/assets', token, multiple: false }
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

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(New)
