import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Performance extends React.Component {

  static propTypes = {
    performance: PropTypes.object,
    form: PropTypes.object
  }

  state = {
    scope: 'daily'
  }

  render() {
    const scopes = [
      { value: 'daily', text: 'Daily' },
      { value: 'weekly', text: 'Weekly' },
      { value: 'monthly', text: 'Monthly' },
      { value: 'yearly', text: 'Yearly' }
    ]
    return (
      <div className="crm-report">
        <div className="crm-report-title">
          Responses
        </div>
        <div className="crm-report-header">
          <div className="crm-report-filter">
            { scopes.map((scope, index) => (
              <div className="crm-report-filter-item" key={`scope_${index}`}>
                <Button { ...this._getScope(scope) } />
              </div>
            ))}
          </div>
        </div>
        <div className="crm-report-table">
          <table className="ui unstackable table">
            <tbody>
              <tr>
                <td>
                  Responses
                </td>
                <td className="right aligned">
                  253
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getScope(scope) {
    return {
      label: scope.text,
      className: this.state.scope !== scope.value ? 'link' : 'text',
      handler: this._handleScope.bind(this, scope.value)
    }
  }

  _handleScope(scope) {
    this.setState({ scope })
  }

}

export default Performance
