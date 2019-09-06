import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import { unflatten } from 'flat'
import Block from './block'
import React from 'react'
import Page from './page'
import _ from 'lodash'

class Sidebar extends React.Component {

  static contextTypes = {}

  static propTypes = {
    active: PropTypes.object,
    config: PropTypes.object,
    onAddSection: PropTypes.func,
    onDeleteSection: PropTypes.func,
    onEdit: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  state = {
    cards: []
  }

  _handleDone = this._handleDone.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return (
      <div className="designer-sidebar">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this._handlePush(Page, this._getPage())
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props
    if(!_.isEqual(active, prevProps.active)) {
      if(active.section === null) return this._handlePop()
      this._handleEdit()
    }
  }

  _getBlock() {
    const { active, config } = this.props
    const block = config.sections[active.section].blocks[active.block]
    const key = `sections[${active.section}].blocks[${active.block}]`
    return {
      active,
      block,
      config: _.get(config, key),
      onDone: this._handleDone,
      onUpdate: this._handleUpdate.bind(this, key)
    }
  }

  _getPage() {
    const { config, onAddSection, onDeleteSection } = this.props
    return {
      config,
      onAddSection,
      onDeleteSection,
      onPush: this._handlePush,
      onPop: this._handlePop,
      onUpdate: this._handleUpdate.bind(this)
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleDone() {
    this.props.onEdit(null, null)
  }

  _handleEdit() {
    this._handlePush(Block, this._getBlock())
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

  _handleUpdate(key, value) {
    const { config } = this.props
    this.props.onUpdate(key, {
      ..._.get(config, key),
      ...unflatten(value)
    })
  }

}

export default Sidebar
