import { Button, Container } from '@admin'
import PropTypes from 'prop-types'
import Results from './results'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class PaymentsField extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    undeposited: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultPprops = {
    onChoose: () => {},
    onReady: () => {}
  }

  state = {
    selected: []
  }

  _handleChoose = this._handleChoose.bind(this)
  _handleDeselectAll = this._handleDeselectAll.bind(this)
  _handleSelectAll = this._handleSelectAll.bind(this)

  render() {
    const total = this._getTotal()
    return (
      <div className="paymentsfield">
        <div className="paymentsfield-selectall">
          <Button { ...this._getSelectAll() } />
        </div>
        <div className="paymentsfield-body">
          <Results { ...this._getResults() } />
        </div>
        <div className="paymentsfield-footer">
          Total: { numeral(total).format('0.00')}
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state
    if(!_.isEqual(selected, prevState.selected)) {
      this._handleChange()
    }
  }
  _getResults() {
    const { undeposited } = this.props
    const { selected } = this.state
    return {
      records: undeposited,
      selected,
      onChoose: this._handleChoose
    }
  }

  _getPanel() {
    return {
      title: 'New Deposit',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Save', handler: this._handleSave }
      ]
    }
  }

  _getSelectAll() {
    const { undeposited } = this.props
    const { selected } = this.state
    return {
      label: undeposited.length === selected.length ? 'deselect all' : 'select all',
      className: 'link',
      handler: undeposited.length === selected.length ? this._handleDeselectAll : this._handleSelectAll
    }
  }

  _getTotal() {
    const { undeposited } = this.props
    const { selected } = this.state
    return undeposited.filter((record, index) => {
      return _.includes(selected, index)
    }).reduce((total, record) => {
      return total + Number(record.amount)
    }, 0)
  }

  _handleChange() {
    const { undeposited } = this.props
    const { selected } = this.state
    this.props.onChange(undeposited.filter((record, index) => {
      return _.includes(selected, index)
    }).reduce((transactions, transaction) => ({
      ...transactions,
      [`${transaction.type}_ids`]: [
        ...transactions[`${transaction.type}_ids`],
        transaction.id
      ]
    }), { payment_ids: [], refund_ids: [] }))
  }

  _handleDeselectAll() {
    this._handleChoose([])
  }

  _handleChoose(selected) {
    this.setState({ selected })
  }

  _handleSelectAll() {
    const { undeposited } = this.props
    this._handleChoose(undeposited.map((record, index) => index))
  }

}

const mapResources = (props, context) => ({
  undeposited: '/api/admin/finance/deposits/undeposited'
})

export default Container(mapResources)(PaymentsField)
