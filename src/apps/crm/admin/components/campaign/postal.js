import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Email extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.number,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)


  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Email Blast',
      method: 'post',
      action: '/api/admin/crm/campaigns/postal',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program_id },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title for this campaign', required: true },
            { label: 'To', name: 'to', type: 'textfield', placeholder: 'Choose criteria' }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChangeField(key, value) {
    if(key === 'program_id') {
      this.setState({
        program_id: value
      })
    }
  }

  _handleSuccess(campaign) {
    this.props.onDone(campaign)
  }

}

export default Email
