import PurposeToken from '../../tokens/purpose'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Voice extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    direction: PropTypes.string,
    program_id: PropTypes.number,
    onBack: PropTypes.func,
    onDone: PropTypes.func
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
      title: 'New Interactive Voice',
      method: 'post',
      action: '/api/admin/crm/campaigns/voice',
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
    if(direction === 'outbound') {
      return [
        { label: 'Purpose', name: 'purpose', type: 'radiogroup', options: ['marketing','transactional'], required: true, format: PurposeToken, defaultValue: 'marketing' }
      ]
    }
    return []
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSuccess(campaign) {
    this.props.onDone(campaign)
  }

}

export default Voice
