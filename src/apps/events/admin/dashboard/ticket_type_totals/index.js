import PropTypes from 'prop-types'
import { Logo } from 'maha-admin'
import React from 'react'

class TicketTypeTotals extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    return (
      <div className="maha-dashboard-card-body">
        <table className="ui unstackable compact table">
          <tbody>
            <tr>
              <td>
                <div className="link">Key</div>
              </td>
              <td className="right aligned">14/50</td>
            </tr>
            <tr>
              <td>
                <div className="link">Key</div>
              </td>
              <td className="right aligned">1/30</td>
            </tr>
            <tr>
              <td>
                <div className="link">Key</div>
              </td>
              <td className="right aligned">14/50</td>
            </tr>
            <tr>
              <td>
                <div className="link">Key</div>
              </td>
              <td className="right aligned">1/30</td>
            </tr>
            <tr>
              <td>
                <div className="link">Key</div>
              </td>
              <td className="right aligned">14/50</td>
            </tr>
            <tr>
              <td>
                <div className="link">Key</div>
              </td>
              <td className="right aligned">1/30</td>
            </tr>
            <tr>
              <td>
                <div className="link">Key</div>
              </td>
              <td className="right aligned">14/50</td>
            </tr>
            <tr>
              <td>
                <div className="link">Key</div>
              </td>
              <td className="right aligned">1/30</td>
            </tr>
            <tr>
              <td>
                <div className="link">Key</div>
              </td>
              <td className="right aligned">14/50</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}

export default TicketTypeTotals
