import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class AllocationField extends React.Component {

  static propTypes = {
    allocations: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    selected: []
  }

  render() {
    const { allocations } = this.props
    const total = this._getTotal()
    return (
      <div className="finance-allocationfield">
        <table className="ui celled compact unstackable table">
          <thead>
            <tr>
              <th className="collapsing">&nbsp;</th>
              <th>Description</th>
              <th className="collapsing">Total</th>
            </tr>
          </thead>
          <tbody>
            { allocations.map((allocation, index) => (
              <tr key={`payment_${index}`} onClick={ this._handleChoose.bind(this, allocation.line_item) }>
                <td>
                  <i className={`fa fa-${this._getIcon(allocation.line_item) }`} />
                </td>
                <td>{ allocation.line_item.description }</td>
                <td className="right aligned">{ numeral(allocation.total).format('0.00') }</td>
              </tr>
            )) }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="2">Total</th>
              <td className="right aligned">{ numeral(total).format('0.00') }</td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state
    if(!_.isEqual(selected, prevState.selected)) {
      this.props.onChange(selected)
    }
  }

  _getIcon(line_item) {
    const { selected } = this.state
    return _.includes(selected, line_item.id) ? 'check-circle' : 'circle-o'
  }

  _getTotal() {
    const { allocations } = this.props
    const { selected } = this.state
    return allocations.filter(allocation => {
      return _.includes(selected, allocation.line_item.id)
    }).reduce((total, allocation) => {
      return total + Number(allocation.total)
    }, 0.00)
  }

  _handleChoose(line_item) {
    const { selected } = this.state
    this.setState({
      selected: [
        ..._.xor(selected, [line_item.id])
      ]
    })
  }

}

export default AllocationField
