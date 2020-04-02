import SessionToken from '../../../tokens/session'
import PropTypes from 'prop-types'
import React from 'react'

class Attendance extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    attendings: PropTypes.array
  }

  render() {
    const { attendings } = this.props
    return (
      <div className="maha-table attendance">
        <table>
          <thead>
            <tr>
              <td>Session</td>
              <td className="collpasing">Attended</td>
            </tr>
          </thead>
          <tbody>
            { attendings.map((attending, index) => (
              <tr key={`attending_${index}`}>
                <td className="unpadded">
                  <SessionToken { ...attending.session } />
                </td>
                <td className="center">
                  { attending.is_checked &&
                    <i className="fa fa-check-circle" />
                  }
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }

}

export default Attendance
