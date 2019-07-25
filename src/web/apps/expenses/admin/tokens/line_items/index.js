import CompactExpenseTypeToken from '../../tokens/expense_type/compact'
import CompactProjectToken from '../../tokens/project/compact'
import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class ExpenseSplit extends React.Component {

  static propTypes = {
    active: PropTypes.number,
    line_items: PropTypes.array
  }

  state = {
    expanded: []
  }

  render() {
    const { expanded } = this.state
    const { line_items } = this.props
    const total = line_items.reduce((total, line_item) => {
      return total + Number(line_item.amount)
    }, 0.00)
    return (
      <div className="line-items-token">
        <p>This receipt was split between the following line items</p>
        <table className="ui compact unstackable table">
          <thead>
            <tr>
              <th>Project</th>
              <th className="collapsing">Amount</th>
            </tr>
          </thead>
          <tbody>
            { line_items.map((line_item, index) => [
              <tr key={`line_item_${index}`} className={ this._getClass(line_item) } onClick={ this._handleToggle.bind(this, index) }>
                <td>
                  <i className={ `fa fa-fw fa-caret-${_.includes(expanded, index) ? 'down' : 'right' }`} />
                  { line_item.project.integration.project_code } - { line_item.project.title }
                </td>
                <td className="right aligned">{ numeral(line_item.amount).format('$0.00') }</td>
              </tr>,
              ..._.includes(expanded, index) ? [(
                <tr className="expanded" key={`line_item_expanded_${index}`}>
                  <td colSpan="3">
                    <List items={ this._getItems(line_item) } />
                  </td>
                </tr>
              )] : []
            ]) }
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <td className="right aligned">
                <strong>{ numeral(total).format('$0.00') }</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

  _getClass(item) {
    const { active } = this.props
    const classes = []
    if(item.id === active) classes.push('selected')
    return classes.join(' ')
  }

  _getItems(item) {
    return [
      { label: 'Project', content: item, format: CompactProjectToken },
      { label: 'Expense Type', content: item, format: CompactExpenseTypeToken },
      { label: 'Description', content: item.description },
      { label: 'Amount', content: item.amount, format: 'currency' }
    ]
  }

  _handleToggle(index) {
    const expanded = _.xor(this.state.expanded, [index])
    this.setState({ expanded })
  }

}

export default ExpenseSplit
