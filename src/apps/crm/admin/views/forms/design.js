import FormDesigner from '../../components/form_designer/wrapper'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

class Form extends React.Component {

  static propTypes = {
    form: PropTypes.object
  }

  render() {
    return <FormDesigner { ...this._getFormDesigner() } />
  }

  _getFormDesigner() {
    const { form } = this.props
    return {
      form,
      code: form.code,
      endpoint: `/api/admin/crm/forms/${form.id}`,
      program: form.program,
      onSave: this._handleSave
    }
  }

}

const mapResourcesToPage = (props, context) => ({
  form: `/api/admin/crm/forms/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Form',
  component: Form
})

export default Page(mapResourcesToPage, mapPropsToPage)
