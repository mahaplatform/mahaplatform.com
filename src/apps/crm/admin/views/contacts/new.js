import CheckboxesField from '../../components/checkboxesfield'
import AddressesField from '../../components/addressesfield'
import BirthdayField from '../../components/birthdayfield'
import PhonesField from '../../components/phonesfield'
import EmailsField from '../../components/emailsfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    platform: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    fields: PropTypes.array
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Contact',
      method: 'post',
      action: '/api/admin/crm/contacts',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      tabs: [
        {
          label: 'Properties',
          sections: [
            {
              label: 'Core Properties',
              fields: [
                { label: 'First Name', name: 'first_name', type: 'textfield', placeholder: 'Enter first name' },
                { label: 'Last Name', name: 'last_name', type: 'textfield', placeholder: 'Enter last name' },
                { label: 'Email', name: 'email_addresses', type: EmailsField },
                { label: 'Phone', name: 'phone_numbers', type: PhonesField },
                { label: 'Mailing Address', name: 'mailing_addresses', type: AddressesField },
                { label: 'Photo', name: 'photo_id', type: 'filefield', prompt: 'Choose Photo', multiple: false },
                { label: 'Organizations', name: 'organization_ids', type: 'lookup2', placeholder: 'Choose organizations', multiple: true, endpoint: '/api/admin/crm/organizations', value: 'id', text: 'name', form: this._getOrganizationForm() },
                { label: 'Birthday', name: 'birthday', type: BirthdayField },
                { label: 'Spouse', name: 'spouse', type: 'textfield', placeholder: 'Enter spouse' }
              ]
            },
            ...this._getProperties()
          ]
        }, {
          label: 'Lists',
          sections: [
            {
              fields: [
                { name: 'list_ids', type: CheckboxesField, endpoint: '/api/admin/crm/lists', value: 'id' }
              ]
            }
          ]
        }, {
          label: 'Topics',
          sections: [
            {
              fields: [
                { name: 'topic_ids', type: CheckboxesField, endpoint: '/api/admin/crm/topics', value: 'id' }
              ]
            }
          ]
        }
      ]
    }
  }

  _getProperties() {
    const { fields } = this.props
    return fields.filter(program => {
      return program.access_type !== 'view'
    }).map(program => ({
      label: `${ program.title } Properties`,
      collapsing: true,
      collapsed: true,
      fields: program.fields.map(field => field.config)
    }))
  }

  _getOrganizationForm() {
    return {
      title: 'New Organization',
      method: 'post',
      action: '/api/admin/crm/organizations',
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield' },
            { label: 'Logo', name: 'logo_id', type: 'filefield', prompt: 'Choose Logo', multiple: false }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.history.push(`/crm/contacts/${result.id}`)
    this.context.modal.close()
  }

}

export default New
