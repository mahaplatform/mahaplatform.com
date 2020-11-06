import AddressesField from '../../components/channelfield/address'
import CheckboxesField from '../../components/checkboxesfield'
import PhonesField from '../../components/channelfield/phone'
import EmailsField from '../../components/channelfield/email'
import PropTypes from 'prop-types'
import { Form } from '@admin'
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
                { label: 'Organization', name: 'organization', type: 'textfield', placeholder: 'Enter organization name' },
                { label: 'Job Title', name: 'position', type: 'textfield', placeholder: 'Enter position' },
                { label: 'Photo', name: 'photo_id', type: 'filefield', prompt: 'Choose Photo', multiple: false },
                { label: 'Birthday', name: 'birthday', type: 'datefield' },
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

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.history.push(`/crm/contacts/${result.id}`)
    this.context.modal.close()
  }

}

export default New
