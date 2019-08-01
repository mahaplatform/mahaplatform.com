import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Usage extends React.Component {

  static propTypes = {
    usage: PropTypes.array
  }

  render() {
    const { usage } = this.props
    return (
      <table className="ui celled compact table">
        <thead>
          <tr>
            <th>Group</th>
            <th className="collapsing">Members</th>
            <th className="collapsing">Active Users</th>
            <th className="collapsing">Total Items</th>
          </tr>
        </thead>
        <tbody>
          { usage.map((group, index) => (
            <tr key={`group_${index}`}>
              <td>{ group.title }</td>
              <td className="right aligned">{ group.members }</td>
              <td className="right aligned">
                { group.active } <span style={{color:'green'}}>
                  ({ numeral(group.active/group.members).format('0%')})
                </span>
              </td>
              <td className="right aligned">{ group.items }</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

}

export default Usage
