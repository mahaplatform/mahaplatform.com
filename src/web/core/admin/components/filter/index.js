import Modal from '../modal'
import Stack from '../stack/stack'
import PropTypes from 'prop-types'
import Overview from './overview'
import Criteria from './criteria'
import React from 'react'

class Filter extends React.PureComponent {

  static childContextTypes = {
    filter: PropTypes.object
  }

  static contextTypes = {}

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

  _handleEdit = this._handleEdit.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return (
      <div className="maha-filter">
        <Modal>
          <Stack { ...this._getStack() } />
        </Modal>
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      cards: [
        { component: Overview, props: this._getOverview() }
      ]
    })
  }

  getChildContext() {
    return {
      filter: {
        push: this._handlePush,
        pop: this._handlePop
      }
    }
  }

  _getCriteria(criteria = null) {
    const { code, fields, onChange } = this.props
    return {
      code,
      defaultValue: criteria,
      fields,
      onChange
    }
  }

  _getOverview() {
    const { code, entity, onChange, onClose } = this.props
    return {
      code,
      entity,
      onEdit: this._handleEdit,
      onNew: this._handleNew,
      onChange,
      onClose
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleEdit(filter) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component: Criteria, props: this._getCriteria(filter.criteria) }
      ]
    })
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

export default Filter
