import ContactToken from '../../../../tokens/contact'
import { Searchbox } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Contacts extends React.Component {

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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="unpadded">
                <Searchbox { ...this._getSearchbox() } />
              </td>
            </tr>
            { contacts.map((contact, index) => (
              <tr key={`contact_${index}`}>
                <td className="unpadded">
                  <ContactToken { ...contact } property="rfc822" />
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }

  _getSearchbox() {
    return {
      prompt: 'Find a Contact'
    }
  }

}

export default Contacts
