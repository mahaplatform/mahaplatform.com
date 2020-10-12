import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Social extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.number,
    onBack: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { program_id } = this.props
    return {
      title: 'New Social Post',
      method: 'post',
      action: '/api/admin/crm/campaigns/social',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program_id },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title for this campaign', required: true },
            { label: 'Profile', name: 'profile_id', type: 'profilefield' }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSuccess(campaign) {
    this.context.router.history.push(`/crm/campaigns/social/${campaign.id}`)
    this.context.modal.close()
  }

}

export default Social
