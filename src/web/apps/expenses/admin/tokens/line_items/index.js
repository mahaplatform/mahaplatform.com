import CompactExpenseTypeToken from '../../tokens/expense_type/compact'
import CompactProjectToken from '../../tokens/project/compact'
import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class ExpenseSplit extends React.Component {

  static propTypes = {
    active: PropTypes.id,
    line_items: PropTypes.array
  }

  state = {
    expanded: []
  }

  render() {
    const { expanded } = this.state
    const { line_items } = this.props
    const total = line_items.reduce((total, line_item) => {
      return total + Number(line_item.amount) + Number(line_item.tax)
    }, 0.00)
    return (
      <div className="line-items-token">
        <table className="ui celled compact unstackable table">
          <thead>
            <tr>
              <th>Project</th>
              <th className="collapsing">Amnt</th>
              <th className="collapsing">Tax</th>
              <th className="collapsing">Total</th>
            </tr>
          </thead>
          <tbody>
            { line_items.length === 0 &&
              <tr>
                <td colSpan="4">There are no line items for this item</td>
              </tr>
            }
            { line_items.map((line_item, index) => [
              <tr key={`line_item_${index}`} className={ this._getClass(line_item) } onClick={ this._handleToggle.bind(this, index) }>
                <td>
                  <i className={ `fa fa-fw fa-caret-${_.includes(expanded, index) ? 'down' : 'right' }`} />
                  { line_item.project.integration.project_code } - { line_item.project.title }
                </td>
                <td className="right aligned">{ numeral(line_item.amount).format('0.00') }</td>
                <td className="right aligned">{ numeral(line_item.tax).format('0.00') }</td>
                <td className="right aligned">{ numeral(Number(line_item.amount) + Number(line_item.tax)).format('0.00') }</td>
              </tr>,
              ..._.includes(expanded, index) ? [(
                <tr className="expanded" key={`line_item_expanded_${index}`}>
                  <td colSpan="5">
                    <List items={ this._getItems(line_item) } />
                  </td>
                </tr>
              )] : []
            ]) }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="3">Total</th>
              <td className="right aligned">
                <strong>{ numeral(total).format('0.00') }</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

  _getClass(line_item) {
    const { active } = this.props
    const classes = []
    if(line_item.id === active) classes.push('selected')
    return classes.join(' ')
  }

  _getItems(line_item) {
    return [
      { label: 'Project', content: line_item, format: CompactProjectToken },
      { label: 'Expense Type', content: line_item, format: CompactExpenseTypeToken },
      { label: 'Description', content: line_item.description },
      { label: 'Amount', content: numeral(line_item.amount).format('0.00') },
      { label: 'Tax', content: numeral(line_item.tax).format('0.00') }
    ]
  }

  _handleToggle(index) {
    const expanded = _.xor(this.state.expanded, [index])
    this.setState({ expanded })
  }

}

export default ExpenseSplit
