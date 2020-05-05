import PurposeToken from '../../../tokens/purpose'
import ToField from '../../../components/tofield'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    campaign: PropTypes.object
  }

  state = {
    config: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { campaign } = this.props
    return {
      title: 'Edit SMS Campaign',
      method: 'patch',
      endpoint: `/api/admin/crm/campaigns/sms/${campaign.id}/edit`,
      action: `/api/admin/crm/campaigns/sms/${campaign.id}`,
      cancelIcon: 'chevron-left',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title for this campaign', required: true },
            ...this._getCampaign()
          ]
        }
      ]
    }
  }

  _getCampaign() {
    const { campaign } = this.props
    const { config } = this.state
    if(campaign.direction === 'inbound') {
      return [
        { label: 'Trigger Term', name: 'term', type: 'textfield', placeholder: 'Enter a trigger term', required: true }
      ]
    } else if(campaign.direction === 'outbound') {
      return [
        { label: 'Purpose', name: 'purpose', type: 'radiogroup', options: ['marketing','transactional'], required: true, format: PurposeToken },
        { label: 'To', name: 'to', type: ToField, program_id: campaign.program.id, channel: 'sms', purpose: config.config }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Edit)
