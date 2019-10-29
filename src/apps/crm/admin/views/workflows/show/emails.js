import { Button }from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Emails extends React.Component {

  static propTypes = {
    emails: PropTypes.array,
    workflow: PropTypes.object
  }

  render() {
    const { emails } = this.props
    return (
      <div>
        <table className="ui table">
          <thead>
            <tr>
              <th>Name</th>
              <th className="collapsing">Sent</th>
              <th className="collapsing">Delivered</th>
              <th className="collapsing">Opened</th>
              <th className="collapsing">Complained</th>
              <th className="collapsing">Clicked</th>
            </tr>
          </thead>
          <tbody>
            { emails.map((email, index) => (
              <tr key={`email_${index}`}>
                <td>
                  <Button { ...this._getEmail(email) } />
                </td>
                <td className="right aligned">81%</td>
                <td className="right aligned">26%</td>
                <td className="right aligned">32%</td>
                <td className="right aligned">15%</td>
                <td className="right aligned">10%</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }

  _getEmail(email) {
    const { workflow } = this.props
    return {
      label: email.title,
      className: 'link',
      route: `/admin/crm/workflows/${workflow.code}/emails/${email.code}`
    }
  }

}
export default Emails
