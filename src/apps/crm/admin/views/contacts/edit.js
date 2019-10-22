import CheckboxesField from '../../components/checkboxesfield'
import AddressesField from '../../components/addressesfield'
import PhonesField from '../../components/phonesfield'
import EmailsField from '../../components/emailsfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    platform: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    fields: PropTypes.array
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { contact } = this.props
    return {
      title: 'Edit Contact',
      method: 'patch',
      endpoint: `/api/admin/crm/contacts/${contact.id}/edit`,
      action: `/api/admin/crm/contacts/${contact.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      tabs: [
        {
          label: 'General',
          sections: [
            {
              fields: [
                { label: 'First Name', name: 'first_name', type: 'textfield', placeholder: 'Enter first name' },
                { label: 'Last Name', name: 'last_name', type: 'textfield', placeholder: 'Enter last name' },
                { label: 'Email', name: 'email_addresses', type: EmailsField, required: true },
                { label: 'Phone', name: 'phone_numbers', type: PhonesField },
                { label: 'Mailing Address', name: 'mailing_addresses', type: AddressesField },
                { label: 'Photo', name: 'photo_id', type: 'filefield', prompt: 'Choose Photo', multiple: false },
                { label: 'Organizations', name: 'organization_ids', type: 'lookup2', multiple: true, endpoint: '/api/admin/crm/organizations', value: 'id', text: 'name', form: this._getOrganizationForm() },
                { label: 'Tags', name: 'tag_ids', type: 'lookup2', multiple: true, endpoint: '/api/admin/crm/tags', value: 'id', text: 'text', form: this._getTagsForm() }
              ]
            }
          ]
        }, {
          label: 'Interests',
          sections: [
            {
              fields: [
                { name: 'topic_ids', type: CheckboxesField, endpoint: '/api/admin/crm/topics' }
              ]
            }
          ]
        }, {
          label: 'Lists',
          sections: [
            {
              fields: [
                { name: 'list_ids', type: CheckboxesField, endpoint: '/api/admin/crm/lists' }
              ]
            }
          ]
        }, {
          label: 'Custom',
          sections: [
            {
              label: 'Primitive Pursuits',
              fields: [
                { label: 'Custom Field 1', name: 'custom_field_1', type: 'textfield' },
                { label: 'Custom Field 2', name: 'custom_field_1', type: 'textfield' },
                { label: 'Custom Field 3', name: 'custom_field_1', type: 'textfield' }
              ],
              collapsing: true,
              collapsed: true
            }, {
              label: 'Healthy Food For All',
              fields: [
                { label: 'Custom Field 1', name: 'custom_field_1', type: 'textfield' },
                { label: 'Custom Field 2', name: 'custom_field_1', type: 'textfield' },
                { label: 'Custom Field 3', name: 'custom_field_1', type: 'textfield' }
              ],
              collapsing: true,
              collapsed: true
            }, {
              label: 'Parents Apart',
              fields: [
                { label: 'Custom Field 1', name: 'custom_field_1', type: 'textfield' },
                { label: 'Custom Field 2', name: 'custom_field_1', type: 'textfield' },
                { label: 'Custom Field 3', name: 'custom_field_1', type: 'textfield' }
              ],
              collapsing: true,
              collapsed: true
            }, {
              label: 'Master Composters',
              fields: [
                { label: 'Custom Field 1', name: 'custom_field_1', type: 'textfield' },
                { label: 'Custom Field 2', name: 'custom_field_1', type: 'textfield' },
                { label: 'Custom Field 3', name: 'custom_field_1', type: 'textfield' }
              ],
              collapsing: true,
              collapsed: true
            }
          ]
        }
      ]
    }
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

  _getTagsForm() {
    return {
      title: 'New Tag',
      method: 'post',
      action: '/api/admin/crm/tags',
      sections: [
        {
          fields: [
            { label: 'Text', name: 'text', type: 'textfield' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Edit
