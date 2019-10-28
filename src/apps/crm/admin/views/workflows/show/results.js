import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import Chart from './chart'
import React from 'react'

class Results extends React.Component {

  static propTypes = {
    workflow: PropTypes.object
  }

  render() {
    return (
      <div className="crm-report">
        <div className="crm-report-chart">
          <Chart { ...this._getChart() } />
        </div>
        <div className="crm-report-table">
          <table className="ui table">
            <tbody>
              <tr>
                <td>
                  <div className="crm-report-key red" />
                  Enrolled
                </td>
                <td className="right aligned">
                  <div className="link">100</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="crm-report-key orange" />
                  Active
                </td>
                <td className="right aligned">
                  { this._getStat(31, 100) }
                </td>
              </tr>
              <tr>
                <td>
                  <div className="crm-report-key yellow" />
                  Lost
                </td>
                <td className="right aligned">
                  { this._getStat(20, 100) }
                </td>
              </tr>
              <tr>
                <td>
                  <div className="crm-report-key green" />
                  Completed
                </td>
                <td className="right aligned">
                  { this._getStat(21, 100) }
                </td>
              </tr>
              <tr>
                <td>
                  <div className="crm-report-key blue" />
                  Converted
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
    return {
      type: 'line'
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
