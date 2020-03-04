import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Property extends React.PureComponent {

  static propTypes = {
    program_id: PropTypes.number,
    trigger_type: PropTypes.string,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { program_id , trigger_type} = this.props
    return {
      title: 'Create Workflow',
      method: 'post',
      action: '/api/admin/crm/workflows',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onSuccess: this._handleDone,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program_id },
            { name: 'trigger_type', type: 'hidden', defaultValue: trigger_type },
            { label: 'Tile', name: 'title', type: 'textfield', placeholder: 'Enter a title' },
            { label: 'Property', name: 'list_id', type: 'lookup', endpoint: '/api/admin/crm/lists', value: 'id', text: 'title', filter: { program_id: { $eq: program_id } } }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone(result) {
    this.props.onDone(result)
  }

}

export default Property
