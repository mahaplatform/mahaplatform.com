import ProgramToken from '@apps/crm/admin/tokens/program'
import ContactToken from '@apps/crm/admin/tokens/contact'
import  { UserToken } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Details extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object,
    connections: PropTypes.array
  }

  render() {
    const { connections } = this.props
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>From</td>
              <td>To</td>
              <td>Duration</td>
              <td>Price</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            { connections.map((connection, index) => (
              <tr key={`connection_${index}`}>
                <td className="unpadded">
                  { connection.from_user &&
                    <UserToken { ...connection.from_user } />
                  }
                  { connection.from_program &&
                    <ProgramToken { ...connection.from_program } />
                  }
                  { connection.from_contact &&
                    <ContactToken { ...connection.from_contact } />
                  }
                </td>
                <td className="unpadded">
                  { connection.to_user &&
                    <UserToken { ...connection.to_user } />
                  }
                  { connection.to_program &&
                    <ProgramToken { ...connection.to_program } />
                  }
                  { connection.to_contact &&
                    <ContactToken { ...connection.to_contact } />
                  }
                </td>
                <td>{ connection.duration }</td>
                <td>{ connection.price }</td>
                <td>{ connection.status }</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }

}

export default Details
