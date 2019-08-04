import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Criteria from './criteria'

class CriteriaWrapper extends React.PureComponent {

  static childContextTypes = {
    criteria: PropTypes.object
  }

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    onChange: PropTypes.func
  }

  state = {
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return (
      <div className="crm-criteria">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      cards: [
        { component: Criteria, props: this._getCriteria() }
      ]
    })
  }

  getChildContext() {
    return {
      criteria: {
        push: this._handlePush,
        pop: this._handlePop
      }
    }
  }

  _getCriteria() {
    const { defaultValue, fields, onChange } = this.props
    return {
      defaultValue,
      fields,
      onChange
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handlePop(index = -1) {
    this.setState({
      cards: this.state.cards.slice(0, index)
    })
  }

  _handlePush(card) {
    this.setState({
      cards: [
        ...this.state.cards,
        card
      ]
    })
  }

}

export default CriteriaWrapper
