import ContactToken from '../../../../tokens/contact'
import { Button } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Contacts extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    contacts: PropTypes.array,
    topic: PropTypes.object
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
            { contacts.length === 0 &&
              <tr>
                <td colSpan="2">
                  There are no contacts interested in this list
                </td>
              </tr>
            }
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
    const { topic } = this.props
    return {
      icon: 'times',
      className: 'icon',
      confirm: 'Are you sure you want to remove this contact?',
      request: {
        endpoint: `/api/admin/crm/programs/${topic.program.id}/topics/${topic.id}/interests/${contact.id}`,
        method: 'delete'
      }
    }
  }

  _handleClick(contact) {
    this.context.router.history.push(`/crm/contacts/${contact.id}`)
  }

}

export default Contacts
