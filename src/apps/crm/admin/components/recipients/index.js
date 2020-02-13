import { Criteria, Infinite, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Recipients extends React.PureComponent {

  static propTypes = {}

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="crm-recipients">
          <div className="crm-recipients-filter">
            <Criteria { ...this._getCriteria() } />
          </div>
          <div className="crm-recipients-results">
            <Infinite { ...this._getInfinite() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getCriteria() {
    return {
      entity: 'contact',
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
      ]
    }
  }

  _getInfinite() {
    return {
      endpoint: '/api/admin/crm/contacts',
      layout: Results,
      props: {}
    }
  }

  _getPanel() {
    return {
      title: 'Select Contacts'
    }
  }

}

export default Recipients
