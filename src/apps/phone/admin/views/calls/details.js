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
                <td>
                  { connection.from_user &&
                    <div>{ connection.from_user.full_name }</div>
                  }
                  { connection.from_program &&
                    <div>{ connection.from_program.title }</div>
                  }
                  { connection.from_contact &&
                    <div>{ connection.from_contact.display_name }</div>
                  }
                  { connection.from_number.formatted }
                </td>
                <td>
                  { connection.to_user &&
                    <div>{ connection.to_user.full_name }</div>
                  }
                  { connection.to_program &&
                    <div>{ connection.to_program.title }</div>
                  }
                  { connection.to_contact &&
                    <div>{ connection.to_contact.display_name }</div>
                  }
                  { connection.to_number.formatted }
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
