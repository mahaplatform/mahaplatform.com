import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Organize extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    _import: PropTypes.object,
    doneText: PropTypes.string,
    lists: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    list_ids: []
  }

  _handleBack = this._handleBack.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { _import } = this.props
    return {
      title: 'Organize Contacts',
      action: `/api/admin/crm/imports/${_import.id}`,
      method: 'patch',
      cancelIcon: 'chevron-left',
      saveText: 'Next',
      onCancel: this._handleBack,
      onSuccess: this._handleSuccess,
      instructions: `You can organize these contacts into lists and topics for bulk
       processing. You can also, with their permission, opt them into receiving
       marketing messages via one of four channels`,
      sections: [
        {
          fields: [
            { label: 'Lists', name: 'config.list_ids', type: 'lookup2', endpoint: `/api/admin/crm/programs/${_import.program.id}/lists`, multiple: true, value: 'id', text: 'title', placeholder: 'Choose lists', form: this._getListForm(), defaultValue: _import.config.list_ids },
            { label: 'Topics', name: 'config.topic_ids', type: 'lookup2', endpoint: `/api/admin/crm/programs/${_import.program.id}/topics`, multiple: true, value: 'id', text: 'title', placeholder: 'Choose topics', form: this._getTopicForm(), defaultValue: _import.config.topic_ids },
            { label: 'Channels', name: 'config.channels', type: 'checkboxes', options: ['email','voice','sms','postal'], value: 'value', text: 'text', defaultValue: _import.config.channels }
          ]
        }
      ]
    }
  }

  _getListForm() {
    const { _import } = this.props
    return {
      title: 'New List',
      method: 'post',
      action: `/api/admin/crm/programs/${_import.program.id}/lists`,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield' }
          ]
        }
      ]
    }
  }

  _getTopicForm() {
    const { _import } = this.props
    return {
      title: 'New Topic',
      method: 'post',
      action: `/api/admin/crm/programs/${_import.program.id}/topics`,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield' }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSuccess(_import) {
    this.props.onDone(_import)
  }

}

export default Organize
