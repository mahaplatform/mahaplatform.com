import CompactExpenseTypeToken from '../../tokens/expense_type/compact'
import CompactProjectToken from '../../tokens/project/compact'
import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class LineItems extends React.Component {

  static propTypes = {
    item: PropTypes.object,
    line_items: PropTypes.array
  }

  state = {
    expanded: []
  }

  render() {
    const { expanded } = this.state
    const { line_items, item } = this.props
    const sums = line_items.reduce((sums, line_item) => ({
      amount: sums.amount + Number(line_item.amount),
      tax: sums.tax + Number(line_item.tax)
    }), { amount: 0.00, tax: 0.00 })
    const unassigned = item.total > sums.amount ? item.total - sums.amount : null
    const overassigned = sums.amount > item.total ? sums.amount - item.total : null
    return (
      <div className="line-items-token">
        <table className="ui celled compact unstackable table">
          <thead>
            <tr>
              <th>Project</th>
              <th className="collapsing">Amnt</th>
              { item.tax_total &&
                <th className="collapsing">Tax</th>
              }
            </tr>
          </thead>
          <tbody>
            { line_items.length === 0 &&
              <tr>
                <td colSpan="2">There are no line items for this item</td>
              </tr>
            }
            { line_items.map((line_item, index) => [
              <tr key={`line_item_${index}`} className={ this._getClass(line_item) } onClick={ this._handleToggle.bind(this, index) }>
                <td>
                  <i className={ `fa fa-fw fa-caret-${_.includes(expanded, index) ? 'down' : 'right' }`} />
                  { line_item.project.integration.project_code } - { line_item.project.title }
                </td>
                <td className="right aligned">{ numeral(line_item.amount).format('0.00') }</td>
                { item.tax_total &&
                  <td className="right aligned">{ numeral(line_item.tax).format('0.00') }</td>
                }
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
                <strong>{ numeral(sums.amount).format('0.00') }</strong>
              </td>
              { item.tax_total &&
                <td className="right aligned">
                  <strong>{ numeral(sums.tax).format('0.00') }</strong>
                </td>
              }
            </tr>
          </tfoot>
        </table>
        { unassigned &&
          <div className="alert">
            { numeral(unassigned).format('0.00') } of the { numeral(sums.amount).format('0.00') } total has not been assigned
          </div>
        }
        { overassigned &&
          <div className="alert">
            { numeral(overassigned).format('0.00') } more than the { numeral(sums.amount).format('0.00') } total has been assigned
          </div>
        }
      </div>
    )
  }

  _getClass(line_item) {
    const { item } = this.props
    const classes = []
    if(line_item.id === item.id) classes.push('selected')
    return classes.join(' ')
  }

  _getItems(line_item) {
    const { item } = this.props
    return [
      { label: 'Project', content: line_item, format: CompactProjectToken },
      { label: 'Expense Type', content: line_item, format: CompactExpenseTypeToken },
      { label: 'Description', content: line_item.description },
      { label: 'Amount', content: numeral(line_item.amount).format('0.00') },
      ...item.tax_total ? [{ label: 'Tax', content: numeral(line_item.tax).format('0.00') }] : []
    ]
  }

  _handleToggle(index) {
    const expanded = _.xor(this.state.expanded, [index])
    this.setState({ expanded })
  }

}

export default LineItems
