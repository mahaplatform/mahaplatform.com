import Stack from '../stack/stack'
import PropTypes from 'prop-types'
import Overview from './overview'
import Criteria from './criteria'
import React from 'react'

class CriteriaWrapper extends React.PureComponent {

  static childContextTypes = {
    criteria: PropTypes.object
  }

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.object,
    entity: PropTypes.string,
    fields: PropTypes.array,
    onChange: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleNew = this._handleNew.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return (
      <div className="maha-criteria">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      cards: [
        { component: Overview, props: this._getOverview() }
//        { component: Criteria, props: this._getCriteria() }
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

  _getOverview() {
    const { entity, onChange } = this.props
    return {
      code: 'foobarbaz',
      entity,
      onNew: this._handleNew,
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

  _handleNew() {
    this.setState({
      cards: [
        ...this.state.cards,
        { component: Criteria, props: this._getCriteria() }
      ]
    })
  }

  _handlePop(index = -1) {
    console.log(index)
    this.setState({
      cards:this.state.cards.slice(0, index)
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
