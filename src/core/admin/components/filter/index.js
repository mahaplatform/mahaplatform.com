import { toFilter } from '../criteria/utils'
import PropTypes from 'prop-types'
import Overview from './overview'
import Criteria from './criteria'
import Stack from '../stack'
import React from 'react'

class Filter extends React.PureComponent {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.object,
    entity: PropTypes.string,
    fields: PropTypes.array,
    onChange: PropTypes.func,
    onClose: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleChange = this._handleChange.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return (
      <div className="maha-filter">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this._handlePush(Overview, this._getOverview())
  }

  _getCriteria(filter = null) {
    const { code, fields } = this.props
    return {
      code,
      filter,
      fields,
      onChange: this._handleChange,
      onPop: this._handlePop
    }
  }

  _getOverview() {
    const { code, entity } = this.props
    return {
      code,
      entity,
      onEdit: this._handleEdit,
      onNew: this._handleNew,
      onChange: this._handleChange
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleChange(criteria) {
    const filter = criteria ? toFilter(criteria) : { $and: [] }
    this.props.onChange(filter)
  }

  _handleEdit(filter) {
    this._handlePush(Criteria, this._getCriteria.bind(this, filter))
  }

  _handleNew() {
    this._handlePush(Criteria, this._getCriteria.bind(this))
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

}

export default Filter
