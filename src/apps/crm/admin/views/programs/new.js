import MerchantToken from '../../../../finance/admin/tokens/merchant'
import VisibilityToken from '../../tokens/visibility'
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
      title: 'New Program',
      method: 'post',
      action: '/api/admin/crm/programs',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Logo', name: 'logo_id', type: 'filefield', prompt: 'Choose Logo', multiple: false },
            { label: 'Managers', name: 'manager_ids', type: 'lookup2', placeholder: 'Assign admin privileges', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', format: UserToken },
            { label: 'Visibility', name: 'visibility', type: 'radiogroup', options: ['public','private'], format: VisibilityToken, defaultValue: 'public' }
          ]
        },  {
          label: 'Finance',
          fields: [
            { label: 'Merchant', name: 'merchant_id', type: 'lookup', placeholder: 'Choose a merchant account', endpoint: '/api/admin/finance/merchants', filter: { status: { $eq: 'active' } }, value: 'id', text: 'title', required: true, format: MerchantToken },
            { label: 'Invoice Address', name: 'address', type: 'textarea', rows: 2, required: true, defaultValue: team.address }
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
