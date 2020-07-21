import { Button, Container, Chart } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import Responses from './responses'

class Form extends React.Component {

  static contextTypes = {
    card: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    controls: PropTypes.any,
    isExpanded: PropTypes.bool,
    form: PropTypes.object
  }

  render() {
    const { controls, form, isExpanded } = this.props

    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-header">
          <div className="maha-dashboard-card-header-details">
            <h2>FORM: { form.title }</h2>
          </div>
          { controls }
        </div>
        <div className="maha-dashboard-card-body scrollable">
          <div className="crm-report">
            <div className="crm-report-header">
              { isExpanded &&
                <Chart { ...this._getExpandedChart() } />
              }
              { !isExpanded &&
                <Chart { ...this._getCompactChart() } />
              }
            </div>
            <div className="crm-report-metrics">
              <div className="crm-report-metric">
                <div className="crm-report-metric-title">
                  Responses
                </div>
                <div className="crm-report-metric-value">
                  <div className="link" onClick={ this._handleResponses.bind(this)}>
                    { form.responses_count }
                  </div>
                </div>
              </div>
              <div className="crm-report-metric">
                <div className="crm-report-metric-title">
                  Respondents
                </div>
                <div className="crm-report-metric-value">
                  { form.respondents_count }
                </div>
              </div>
              <div className="crm-report-metric">
                <div className="crm-report-metric-title">
                  Revenue
                </div>
                <div className="crm-report-metric-value">
                  { numeral(form.revenue).format('$0') }
                </div>
              </div>
              <div className="crm-report-metric">
              </div>
            </div>
            <div className="crm-report-table">
            </div>
          </div>
        </div>
        <div className="maha-dashboard-card-footer">
          <Button { ...this._getForm() } />
        </div>
      </div>
    )
  }

  _getExpandedChart() {
    const { form } = this.props
    return {
      endpoint: `/api/admin/crm/forms/${form.id}/performance`,
      started_at: form.created_at
    }
  }

  _getCompactChart() {
    const { form } = this.props
    return {
      endpoint: `/api/admin/crm/forms/${form.id}/performance`,
      started_at: form.created_at,
      pointRadius: 0,
      borderWidth: 2,
      displayXAxis: false
    }
  }

  _getForm() {
    const { config } = this.props

    return {
      label: ' Manage Form',
      icon: 'gear',
      className: 'link',
      route: `/admin/crm/forms/${config.form_id}`
    }
  }

  _getResponses() {
    const { config, isExpanded, form } = this.props
    return {
      config,
      isExpanded,
      form
    }
  }

  _handleResponses() {
    this.context.card.push(Responses, this._getResponses())
  }

}

const mapResources = (props, context) => ({
  form: `/api/admin/crm/forms/${props.config.form_id}`
})

export default Container(mapResources)(Form)
