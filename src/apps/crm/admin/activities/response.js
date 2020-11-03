import WorkflowActions from '../../../automation/admin/components/workflow_actions'
import { Button, Container } from 'maha-admin'
import Content from '../tokens/content'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Response extends React.PureComponent {

  static propTypes = {
    actions: PropTypes.array,
    activity: PropTypes.object,
    enrollment: PropTypes.object,
    form: PropTypes.object,
    program: PropTypes.object,
    response: PropTypes.object,
    workflow: PropTypes.object
  }

  render() {
    const { actions, enrollment, response, workflow } = this.props
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
            { response.invoice_id &&
              <tr>
                <td>Invoice</td>
                <td><Button { ...this._getInvoice() } /></td>
              </tr>
            }
          </tbody>
        </table>
        <WorkflowActions workflow={ workflow } enrollment={ enrollment } actions={ actions } trigger_type={ workflow.trigger_type } />
      </div>
    )
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

}

const mapResources = (props, context) => ({
  actions: `/api/admin/crm/forms/${props.activity.data.form_id}/responses/${props.activity.data.response_id}/actions`,
  enrollment: `/api/admin/crm/forms/${props.activity.data.form_id}/responses/${props.activity.data.response_id}/enrollment`,
  form: `/api/admin/crm/forms/${props.activity.data.form_id}`,
  response: `/api/admin/crm/forms/${props.activity.data.form_id}/responses/${props.activity.data.response_id}`,
  workflow: `/api/admin/crm/forms/${props.activity.data.form_id}/workflow`
})

export default Container(mapResources)(Response)
