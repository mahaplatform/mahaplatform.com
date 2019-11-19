import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Usage extends React.Component {

  static propTypes = {
    usage: PropTypes.array
  }

  state = {
    expanded: null
  }

  render() {
    const { expanded } = this.state
    const { usage } = this.props
    const { user_types, totals } = usage
    return (
      <div className="usage">
        <table className="ui celled compact table">
          <thead>
            <tr>
              <th>Group</th>
              <th className="collapsing">Members</th>
              <th className="collapsing">Active (#)</th>
              <th className="collapsing">Active (%)</th>
              <th className="collapsing">Total Items</th>
            </tr>
          </thead>
          <tbody>
            { user_types.map((user_type, index) => [
              <tr key={`user_type_${index}`} className="user_type" onClick={ this._handleToggle.bind(this, user_type.id)}>
                <td>
                  { user_type.id === expanded ?
                    <i className="fa fa-fw fa-caret-down" /> :
                    <i className="fa fa-fw fa-caret-right" />
                  } { user_type.title }
                </td>
                <td className="right aligned">{ user_type.members }</td>
                <td className="right aligned">{ user_type.active }</td>
                <td className="right aligned">
                  { numeral(user_type.active / user_type.members).format('0%') }
                </td>
                <td className="right aligned">{ user_type.items }</td>
              </tr>,
              user_type.id === expanded ? user_type.groups.map((group, index) => (
                <tr key={`group_${index}`} className="group">
                  <td>{ group.title }</td>
                  <td className="right aligned">{ group.members }</td>
                  <td className="right aligned">{ group.active }</td>
                  <td className="right aligned">
                    { numeral(group.active / group.members).format('0%') }
                  </td>
                  <td className="right aligned">{ group.items }</td>
                </tr>
              )) : null
            ])}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <td className="right aligned">{ totals.members }</td>
              <td className="right aligned">{ totals.active }</td>
              <td className="right aligned">
                { numeral(totals.active / totals.members).format('0%') }
              </td>
              <td className="right aligned">{ totals.items }</td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

  _handleToggle(id) {
    this.setState({
      expanded: this.state.expanded === id ? null : id
    })
  }

}

const mapResourcesToPage = (props, context) => ({
  usage: '/api/admin/finance/usage'
})

export default Container(mapResourcesToPage)(Usage)
