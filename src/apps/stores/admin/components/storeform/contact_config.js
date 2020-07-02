import ContactFieldsField from '../../../../events/admin/components/contactfieldsfield'
import { Container, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class ContactConfig extends React.PureComponent {

  static propTypes = {
    st: PropTypes.object,
    fields: PropTypes.array,
    program: PropTypes.object,
    onBack: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { st } = this.props
    return {
      title: 'Contact Fields',
      cancelIcon: 'chevron-left',
      saveText: 'Next',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'contact_config', type: ContactFieldsField, fields: this._getFields(), defaultValue: st.contact_config }
          ]
        }
      ]
    }
  }

  _getFields() {
    const { fields, program } = this.props
    return [{
      label: program.title,
      fields
    }]
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange({ contact_config }) {
    // this.props.onChange({ contact_config })
  }

  _handleSuccess({ contact_config }) {
    this.props.onDone({ contact_config })
  }

}

const mapResources = (props, context) => ({
  fields: `/api/admin/crm/programs/${props.st.program_id}/fields`,
  program: `/api/admin/crm/programs/${props.st.program_id}`
})

export default Container(mapResources)(ContactConfig)
