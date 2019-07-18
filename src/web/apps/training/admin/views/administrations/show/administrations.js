import { CompactUserToken, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Administrations extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    administrations: PropTypes.array
  }

  static defaultProps = {}

  render() {
    const { administrations } = this.props
    return (
      <div className="administrations">
        <table className="ui celled unstackable compact table">
          <thead>
            <tr>
              <th>User</th>
              <th className="collapsing">Score</th>
              <th className="collapsing">Passed</th>
            </tr>
          </thead>
          <tbody>
            { administrations.length === 0 &&
              <tr>
                <td colSpan="3" className="center aligned">There are no employees registered for this offering yet</td>
              </tr>
            }
            { administrations.map((administration, index) => (
              <tr key={`row_${index}`}>
                <td className="user-cell"><CompactUserToken { ...administration.user } /></td>
                <td className="right aligned">
                  { administration.score === null ?
                    <span /> :
                    <span>{ administration.score }%</span>
                  }
                </td>
                <td className="center aligned">
                  { administration.score === null ?
                    <span /> :
                    <span>
                      { administration.was_passed ?
                        <i className="fa fa-check" /> :
                        <i className="fa fa-times" />
                      }
                    </span>
                  }
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }

  _getEmpty() {
    return {
      icon: 'question',
      title: 'No employees',
      text: 'No employees have registered for this offering'
    }
  }

}

export default Administrations
