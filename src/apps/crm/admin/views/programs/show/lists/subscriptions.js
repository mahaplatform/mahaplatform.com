import ContactToken from '../../../../tokens/contact'
import { Button, Searchbox } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Subscriptions extends React.Component {

  static propTypes = {
    subscriptions: PropTypes.array,
    list: PropTypes.object
  }

  render() {
    const { subscriptions } = this.props
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Contact</td>
              <td />
            </tr>
          </thead>
          <tbody>
            { subscriptions.map((contact, index) => (
              <tr key={`contact_${index}`}>
                <td className="unpadded">
                  <ContactToken { ...contact } property="rfc822" />
                </td>
                <td className="unpadded">
                  <Button { ...this._getRemove(contact) } />
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }

  _getRemove(contact) {
    const { list } = this.props
    return {
      icon: 'times',
      className: 'icon',
      confirm: 'Are you sure you want to remove this contact?',
      request: {
        endpoint: `/api/admin/crm/programs/${list.program.id}/lists/${list.id}/subscriptions/${contact.id}`,
        method: 'delete'
      }
    }
  }

  _getSearchbox() {
    return {
      prompt: 'Find a Contact'
    }
  }

}

export default Subscriptions
