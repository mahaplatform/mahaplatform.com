import { UserToken } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class User extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    administrations: PropTypes.array
  }

  static defaultProps = {}

  render() {
    const { administrations } = this.props
    return (
      <div className="quiz-results-user">
        <table className="ui celled unstackable compact table">
          <thead>
            <tr>
              <th>User</th>
              <th className="collapsing">Score</th>
              <th className="collapsing">Passed</th>
            </tr>
          </thead>
          <tbody>
            { administrations.map((administration, index) => (
              <tr key={`row_${index}`}>
                <td><UserToken { ...administration.user } /></td>
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

}

export default User
