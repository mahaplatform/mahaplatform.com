import PurposeToken from '../../../tokens/purpose'
import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class SMS extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    direction: PropTypes.string,
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
    const { direction, program_id } = this.props
    return {
      title: 'New Interactive SMS',
      method: 'post',
      action: '/api/admin/crm/campaigns/sms',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program_id },
            { name: 'direction', type: 'hidden', defaultValue: direction },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title for this campaign', required: true },
            ...this._getDirection()
          ]
        }
      ]
    }
  }

  _getDirection() {
    const { direction } = this.props
    if(direction === 'inbound') {
      return [
        { label: 'Trigger Term', name: 'term', type: 'textfield', placeholder: 'Incoming text message' }
      ]
    } else if(direction === 'outbound') {
      return [
        { label: 'Purpose', name: 'purpose', type: 'radiogroup', options: ['marketing','transactional'], required: true, format: PurposeToken, defaultValue: 'marketing' }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSuccess(campaign) {
    this.context.router.history.push(`/admin/crm/campaigns/sms/${campaign.code}`)
    this.context.modal.close()
  }

}

export default SMS
