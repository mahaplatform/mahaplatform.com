import ContactToken from '../../tokens/contact'
import { CriteriaDesigner } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Recipients extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    onDone: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return <CriteriaDesigner { ...this._getCriteriaDesigner() } />
  }

  _getCriteriaDesigner() {
    return {
      endpoint: '/api/admin/crm/contacts',
      entity: 'contact',
      format: ContactToken,
      fields: [
        { label: 'Contact', fields: [
          { name: 'first name', key: 'first_name', type: 'text' },
          { name: 'last name', key: 'last_name', type: 'text' },
          { name: 'email', key: 'email', type: 'text' },
          { name: 'phone', key: 'phone', type: 'text' },
          { name: 'street_1', key: 'street_1', type: 'text' },
          { name: 'city', key: 'city', type: 'text' },
          { name: 'state/province', key: 'state_province', type: 'text' },
          { name: 'postal code', key: 'postal_code', type: 'text' },
          { name: 'birthday', key: 'birthday', type: 'text' },
          { name: 'spouse', key: 'spouse', type: 'text' },
          { name: 'tags', key: 'tag_id', type: 'select', endpoint: '/api/admin/crm/tags', text: 'text', value: 'id' },
          { name: 'organization', key: 'organization_id', type: 'select', endpoint: '/api/admin/crm/organizations', text: 'name', value: 'id' }
        ] }
      ],
      title: 'Select Contacts',
      onDone: this._handleDone
    }
  }

  _handleDone() {
    this.context.modal.close()
  }

}

export default Recipients
