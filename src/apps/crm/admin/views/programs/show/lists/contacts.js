import ContactToken from '../../../../tokens/contact'
import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Contacts extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    contacts: PropTypes.array,
    list: PropTypes.object
  }

  render() {
    const { contacts } = this.props
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
            { contacts.map((contact, index) => (
              <tr key={`contact_${index}`}>
                <td className="unpadded" onClick={ this._handleClick.bind(this, contact) }>
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

  _handleClick(contact) {
    this.context.router.history.push(`/admin/crm/contacts/${contact.id}`)
  }

}

export default Contacts
