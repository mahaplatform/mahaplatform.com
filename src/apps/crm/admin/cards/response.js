import { Button, Container } from 'maha-admin'
import Content from '../tokens/content'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Response extends React.PureComponent {

  static propTypes = {
    activity: PropTypes.object,
    form: PropTypes.object,
    program: PropTypes.object,
    response: PropTypes.object
  }

  render() {
    const { response } = this.props
    const fields = this._getFields()
    return (
      <div className="crm-form-card">
        <table className="ui celled compact unstackable table">
          <tbody>
            <tr>
              <td>Form</td>
              <td><Button { ...this._getForm() } /></td>
            </tr>
            { fields.map((field, index) => (
              <tr key={`field_${index}`}>
                <td>{ field.name.value }</td>
                <td>
                  <Content data={ response.data } field={ field } />
                </td>
              </tr>
            )) }
            <tr>
              <td>Revenue</td>
              <td>{ numeral(response.revenue).format('$0.00') }</td>
            </tr>
            <tr>
              <td>Response</td>
              <td><Button { ...this._getResponse() } /></td>
            </tr>
            { response.invoice_id &&
              <tr>
                <td>Invoice</td>
                <td><Button { ...this._getInvoice() } /></td>
              </tr>
            }
            <tr>
              <td>Workflow</td>
              <td><Button { ...this._getEnrollment() } /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  _getEnrollment() {
    const { response } = this.props
    return {
      label: 'View Enrollment',
      className: 'link',
      route: `/admin/crm/workflows/${response.enrollment.workflow_id}/enrollments/${response.enrollment.id}`
    }
  }

  _getFields() {
    const { form } = this.props
    return form.config.fields.filter(field => {
      return field.type !== 'text'
    })
  }

  _getForm() {
    const { form } = this.props
    return {
      label: form.title,
      className: 'link',
      route: `/admin/crm/forms/${form.id}`
    }
  }

  _getInvoice() {
    const { response } = this.props
    return {
      label: 'View Invoice',
      className: 'link',
      route: `/admin/finance/invoices/${response.invoice_id}`
    }
  }

  _getResponse() {
    const { form, response } = this.props
    return {
      label: 'View Response',
      className: 'link',
      route: `/admin/crm/forms/${form.id}/responses/${response.id}`
    }
  }

}

const mapResources = (props, context) => ({
  form: `/api/admin/crm/forms/${props.activity.data.form_id}`,
  response: `/api/admin/crm/forms/${props.activity.data.form_id}/responses/${props.activity.data.response_id}`
})

export default Container(mapResources)(Response)
