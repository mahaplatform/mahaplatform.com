import { Form, UserToken } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    team: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { team } = this.props
    return {
      title: 'New Qualtrics Account',
      method: 'post',
      action: '/api/admin/crm/programs',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

const mapStateToProps = (state, props) => ({
  team: state.maha.admin.team
})

export default connect(mapStateToProps)(New)
