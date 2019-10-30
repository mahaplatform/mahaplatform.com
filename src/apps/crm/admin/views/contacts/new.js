import CheckboxesField from '../../components/checkboxesfield'
import AddressesField from '../../components/addressesfield'
import PhonesField from '../../components/phonesfield'
import EmailsField from '../../components/emailsfield'
import sections from '../sections'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

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
                { label: 'Organizations', name: 'organization_ids', type: 'lookup2', placeholder: 'Choose organizations', multiple: true, endpoint: '/api/admin/crm/organizations', value: 'id', text: 'name', form: this._getOrganizationForm() },
                { label: 'Tags', name: 'tag_ids', type: 'lookup2', placeholder: 'Choose tags', multiple: true, endpoint: '/api/admin/crm/tags', value: 'id', text: 'text', form: this._getTagsForm() }
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
                { name: 'list_ids', type: CheckboxesField, endpoint: '/api/admin/crm/lists', filters: { type: { $eq: 'static' } } }
              ]
            }
          ]
        }, {
          label: 'Custom',
          sections: this._getCustomFields()
        }
      ]
    }
  }

  _getCustomFields() {
    const {fields} = this.props
    const programs = fields.reduce((programs, field) => ({
      ...programs,
      [field.program.id]: {
        label: field.program.title,
        fields: [
          ..._.get(programs, `${field.program.id}.fields`) || [],
          field.config
        ]
      }
    }), {})
    return Object.values(programs)
  }

  _getSections() {
    const { fields } = this.props
    const results = sections(fields)
    return results
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
    this.context.router.history.push(`/admin/crm/contacts/${result.id}`)
    this.context.modal.close()
  }

}

export default New
