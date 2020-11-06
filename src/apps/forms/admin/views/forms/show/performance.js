import { Button, Chart } from '@admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

class Performance extends React.Component {

  static propTypes = {
    form: PropTypes.object
  }

  render() {
    const { form } = this.props
    const { respondents_count, responses_count, unknown_respondents_count } = form
    const { known_respondents_count, revenue, average_duration } = form
    const { first_response, last_response } = form
    return (
      <div className="crm-report">
        <div className="crm-report-title">
          Responses
        </div>
        <div className="crm-report-header">
          <Chart { ...this._getChart() }  />
        </div>
        <div className="crm-report-metrics">
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Responses
            </div>
            <div className="crm-report-metric-value">
              { this._getButton(responses_count, '') }
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Respondents
            </div>
            <div className="crm-report-metric-value">
              { this._getButton(respondents_count, '') }
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Revenue
            </div>
            <div className="crm-report-metric-value">
              { numeral(revenue).format('$0.00') }
            </div>
          </div>
        </div>
        <div className="crm-report-table">
          <table className="ui unstackable table">
            <tbody>
              <tr>
                <td>Unknown Respondents</td>
                <td className="right aligned">
                  { unknown_respondents_count }
                </td>
              </tr>
              <tr>
                <td>Known Respondents</td>
                <td className="right aligned">
                  { known_respondents_count }
                </td>
              </tr>
              <tr>
                <td>Average Duration</td>
                <td className="right aligned">
                  { average_duration } seconds
                </td>
              </tr>
              <tr>
                <td>First Response</td>
                <td className="right aligned">
                  { first_response ? moment(first_response).format('MM/DD/YY hh:mmA') : 'N/A' }
                </td>
              </tr>
              <tr>
                <td>Last Response</td>
                <td className="right aligned">
                  { last_response ? moment(last_response).format('MM/DD/YY hh:mmA') : 'N/A' }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getButton(value, report) {
    const { form } = this.props
    const query = report ? `?$filter[${report}][$eq]=true` : ''
    const button = {
      label: value,
      className: 'link',
      route: `/admin/forms/forms/${form.id}/responses${query}`
    }
    return <Button { ...button } />
  }

  _getChart() {
    const { form } = this.props
    return {
      endpoint: `/api/admin/forms/forms/${form.id}/performance`,
      started_at: form.created_at
    }
  }

}

export default Performance
