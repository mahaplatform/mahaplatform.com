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
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Session</td>
              <td>Attended</td>
            </tr>
          </thead>
          <tbody>
            { attendings.map((attending, index) => (
              <tr key={`attending_${index}`}>
                <td className="unpadded">
                  <SessionToken { ...attending.session } />
                </td>
                <td>
                  <i className="fa fa-check" />
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
