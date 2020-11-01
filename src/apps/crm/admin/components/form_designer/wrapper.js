import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import FormDesigner from './index'
import React from 'react'

class FormDesignerWrapper extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    programfields: PropTypes.array
  }

  render() {
    return (
      <FormDesigner { ...this._getFormDesigner() } />
    )
  }

  _getFormDesigner() {
    return {
      ...this.props,
      fields: this._getFields()
    }
  }

  _getFields() {
    const { program, programfields } = this.props
    return [
      { label: 'First Name', field: { label: 'First Name', name: { token: 'first_name', value: 'First Name' }, placeholder: 'Enter First Name', contactfield: { name: 'first_name', type: 'textfield' } } },
      { label: 'Last Name', field: { label: 'Last Name', name: { token: 'last_name', value: 'Last Name' }, placeholder: 'Enter Last Name', contactfield: { name: 'last_name', type: 'textfield' } } },
      { label: 'Email', field: { label: 'Email', name: { token: 'email', value: 'Email' }, placeholder: 'Enter Email', contactfield: { name: 'email', type: 'emailfield' } } },
      { label: 'Phone', field: { label: 'Phone', name: { token: 'phone', value: 'Phone' }, placeholder: 'Enter Phone', contactfield: { name: 'phone', type: 'phonefield' } } },
      { label: 'Address', field: { label: 'Address', name: { token: 'address', value: 'Address' }, placeholder: 'Enter Address', contactfield: { name: 'address', type: 'addressfield' } } },
      { label: 'Organization', field: { label: 'Organization', name: { token: 'organization', value: 'Organization' }, placeholder: 'Enter Organization Name', contactfield: { name: 'organization', type: 'textfield' } } },
      { label: 'Position/Job Title', field: { label: 'Position/Job Title', name: { token: 'position', value: 'Position' }, placeholder: 'Enter Position', contactfield: { name: 'position', type: 'textfield' } } },
      { label: 'Birthday', field: { label: 'Birthday', name: { token: 'birthday', value: 'Birthday' }, placeholder: 'Enter Birthday', contactfield: { name: 'birthday', type: 'datefield' } } },
      { label: 'Spouse', field: { label: 'Spouse', name: { token: 'spouse', value: 'Spouse' }, placeholder: 'Enter Spouse', contactfield: { name: 'spouse', type: 'textfield' } } },
      ...programfields.map(field => ({
        label: field.label,
        field: {
          label: field.label,
          name: field.name,
          contactfield: field.config
        }
      })),
      { label: 'Topics', field: { label: 'Topics', name: { token: 'topics', value: 'Topics' }, contactfield: { name: 'classification.topic_ids', type: 'checkboxes', endpoint: `/api/crm/programs/${program.id}/topics`, value: 'id', text: 'title' } } },
      { label: 'Email Consent', field: { name: { token: 'email_consent', value: 'Email Consent' }, prompt: '<p>Please send me emails</p>', contactfield: { name: 'consent.email', type: 'checkbox' } } },
      { label: 'SMS Consent', field: { name: { token: 'sms_consent', value: 'SMS Consent' }, prompt: '<p>Please send me text messages</p>', contactfield: { name: 'consent.sms', type: 'checkbox' } } },
      { label: 'Voice Consent', field: { name: { token: 'voice_consent', value: 'Voice Consent' }, prompt: '<p>Please call me</p>', contactfield: { name: 'consent.voice', type: 'checkbox' } } },
      { label: 'Postal Consent', field: { name: { token: 'postal_consent', value: 'Postal Consent' }, prompt: '<p>Please send me mail</p>', contactfield: { name: 'consent.postal', type: 'checkbox' } } }
    ]

  }

}
const mapResources = (props, context) => ({
  programfields: `/api/admin/crm/programs/${props.program.id}/fields`
})

export default Container(mapResources)(FormDesignerWrapper)
