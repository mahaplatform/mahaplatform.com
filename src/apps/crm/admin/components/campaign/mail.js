import ProgramToken from '../../tokens/program'
import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Email extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    onBack: PropTypes.func
  }

  static defaultProps = {}

  state = {
    program_id: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)


  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { program_id } = this.state
    const disabled = _.isNil(program_id)
    return {
      title: 'New Email Blast',
      method: 'post',
      action: '/api/admin/crm/campaigns/mail',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Program', name: 'program_id', type: 'lookup', placeholder: 'Choose a program', endpoint: '/api/admin/crm/programs', value: 'id', text: 'title', required: true, format: ProgramToken },
            { label: 'Title', name: 'title', type: 'textfield', disabled, placeholder: 'Enter a title for this campaign', required: true },
            { label: 'To', name: 'to', type: 'textfield', disabled, placeholder: 'Choose criteria', required: true }
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

  _handleSuccess() {

  }

}

export default Email
