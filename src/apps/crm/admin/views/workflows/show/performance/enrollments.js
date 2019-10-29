import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import Chart from './chart'
import React from 'react'

class Results extends React.Component {

  static propTypes = {
    report: PropTypes.object,
    workflow: PropTypes.object
  }

  render() {
    return (
      <div className="crm-report">
        <div className="crm-report-title">
          Enrollments
        </div>
        <div className="crm-report-header">
          Week | Months | Years
        </div>
        <div className="crm-report-chart">
          <Chart { ...this._getChart() } />
        </div>
        <div className="crm-report-table">
          <table className="ui table">
            <tbody>
              <tr>
                <td>
                  <i className="fa fa-check-square" /> Enrolled
                </td>
                <td className="right aligned">
                  <div className="link">100</div>
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fa fa-check-square" /> Active
                </td>
                <td className="right aligned">
                  { this._getStat(31, 100) }
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fa fa-check-square" /> Lost
                </td>
                <td className="right aligned">
                  { this._getStat(20, 100) }
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fa fa-check-square" /> Completed
                </td>
                <td className="right aligned">
                  { this._getStat(21, 100) }
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fa fa-check-square" /> Converted
                </td>
                <td className="right aligned">
                  { this._getStat(28, 100) }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getChart() {
    const { report } = this.props
    return {
      datasets: [{
        label: 'Enrolled',
        borderColor: '#DB2828',
        data: report.enrolled
      }, {
        label: 'Active',
        borderColor: '#F2711C',
        data: report.active
      }, {
        label: 'Lost',
        borderColor: '#FBBD08',
        data: report.lost
      }, {
        label: 'Completed',
        borderColor: '#B5CC18',
        data: report.completed
      }, {
        label: 'Conversions',
        borderColor: '#21BA45',
        data: report.conversions
      }]
    }
  }

  _getPercent(quantity, total) {
    const { workflow } = this.props
    const percent = quantity / total
    const button = {
      label: numeral(percent).format('0.0%'),
      className: 'link',
      route: `/admin/crm/workflows/${workflow.code}/enrollments`
    }
    return <Button { ...button } />
  }

  _getStat(quantity, total) {
    const percent = this._getPercent(quantity, total)
    const portion = `[${quantity} / ${total}]`
    return (
      <div>
        { percent } { portion }
      </div>
    )
  }
}

export default Results
