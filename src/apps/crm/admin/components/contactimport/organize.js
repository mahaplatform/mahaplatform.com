import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Organize extends React.PureComponent {

  static propTypes = {
    _import: PropTypes.object,
    onDone: PropTypes.func
  }

  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { _import } = this.props
    return {
      title: 'Organize Contacts',
      action: `/api/admin/imports/${_import.id}`,
      method: 'patch',
      cancelText: null,
      saveText: 'Next',
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Subscribe contacts to the following lists', name: 'config.list_ids', type: 'lookup2', endpoint: '/api/admin/crm/lists', multiple: true, value: 'id', text: 'title' },
            { label: 'Mark contacts as interested in the following topics', name: 'config.topic_ids', type: 'lookup2', endpoint: '/api/admin/crm/topics', multiple: true, value: 'id', text: 'title' }
          ]
        }
      ]
    }
  }

  _handleSuccess(_import) {
    this.props.onDone(_import)
  }

}

export default Organize
