import ContactFieldsField from '../../../../events/admin/components/contactfieldsfield'
import { Container, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Contact extends React.Component {

  static propTypes = {
    fields: PropTypes.array,
    formdata: PropTypes.array,
    program: PropTypes.object,
    onBack: PropTypes.func,
    onNext: PropTypes.func
  }

  form = null

  _handleBack = this._handleBack.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      reference: node => this.form = node,
      showHeader: false,
      buttons: [
        { label: 'Prev', color: 'red', handler: this._handleBack },
        { label: 'Next', color: 'red', handler: this._handleSubmit }
      ],
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'contact_config', type: ContactFieldsField, fields: this._getFields() }
          ]
        }
      ]
    }
  }

  _getFields() {
    const { fields, formdata } = this.props
    return [{
      label: formdata.program.title,
      fields
    }]
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(product) {
    this.props.onNext(product)
  }

}

const mapResources = (props, context) => ({
  fields: `/api/admin/crm/programs/${props.formdata.program.id}/fields`
})

export default Container(mapResources)(Contact)
