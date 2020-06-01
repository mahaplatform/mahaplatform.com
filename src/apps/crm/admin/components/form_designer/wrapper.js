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
      { label: 'Contact Fields', fields: [
        { label: 'First Name', name: 'first_name', type: 'textfield' },
        { label: 'Last Name', name: 'last_name', type: 'textfield' },
        { label: 'Email', name: 'email', type: 'emailfield' },
        { label: 'Phone', name: 'phone', type: 'phonefield' },
        { label: 'Address', name: 'address', type: 'addressfield' },
        { label: 'Birthday', name: 'birthday', type: 'textfield' },
        { label: 'Spouse', name: 'spouse', type: 'textfield' }
      ] },
      ...programfields.length > 0 ? [{ label: `${program.title} Fields`, fields: programfields.map(field => ({
        ...field.config
      }))}] : [],
      { label: 'Consent', fields: [
        { label: 'Email Consent', name: 'consent.email', type: 'checkbox', prompt: '<p>Please send me emails</p>' },
        { label: 'SMS Consent', name: 'consent.sms', type: 'checkbox', prompt: '<p>Please send me text messages</p>' },
        { label: 'Voice Consent', name: 'consent.voice', type: 'checkbox', prompt: '<p>Please call me</p>' }
      ] }
    ]
  }


}

const mapResources = (props, context) => ({
  programfields: `/api/admin/crm/programs/${props.program.id}/fields`
})

export default Container(mapResources)(FormDesignerWrapper)
