import { Infinite } from 'maha-admin'
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

  render() {
    const total = this._getTotal()
    return (
      <div className="paymentsfield">
        <div className="paymentsfield-body">
          <Infinite { ...this._getInfinite() } />
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

  _getInfinite() {
    const { selected } = this.state
    const empty = {
      icon: 'dollar',
      title: 'No Payments',
      text: 'There are no undeposited payments'
    }
    return {
      endpoint: '/api/admin/finance/payments',
      filter: {
        method: {
          $in: ['cash','check','paypal']
        },
        deposit_id: {
          $eq: 'null'
        }
      },
      notFound: empty,
      empty,
      layout: Results,
      props: {
        selected,
        onChoose: this._handleChoose
      }
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

  _getTotal() {
    return this.state.selected.reduce((total, record) => {
      return total + Number(record.disbursed)
    }, 0)
  }

  _handleChange() {
    const { selected } = this.state
    this.props.onChange(selected.map(record => {
      return record.id
    }))
  }

  _handleChoose(selected) {
    this.setState({ selected })
  }

}

export default PaymentsField
