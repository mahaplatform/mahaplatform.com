import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Finalize extends React.PureComponent {

  static propTypes = {
    _import: PropTypes.object,
    onDone: PropTypes.func
  }

  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Oraganize Contacts',
      cancelText: null,
      saveText: 'Next',
      onSubmit: this._handleSubmit,
      sections: [
        {
          fields: [
            { label: 'Subscribe contacts to the following lists', name: 'list_ids', type: 'lookup', endpoint: '/api/admin/crm/lists', value: 'id', text: 'title', multiple: true },
            { label: 'Mark contacts as interested in the following topics', name: 'topic_ids', type: 'lookup', endpoint: '/api/admin/crm/topics', value: 'id', text: 'title', multiple: true }
          ]
        }
      ]
    }
  }

  _handleSubmit(values) {
    const { _import } = this.props
    this.props.onDone(_import)
  }

}

export default Finalize
