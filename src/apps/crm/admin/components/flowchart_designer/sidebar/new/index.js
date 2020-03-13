import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Types from './types'
import React from 'react'

class New extends React.PureComponent {

  static propTypes = {
    blocks: PropTypes.array,
    cid: PropTypes.string,
    fields: PropTypes.array,
    properties: PropTypes.array,
    step: PropTypes.object,
    program: PropTypes.object,
    onAdd: PropTypes.func,
    onCancel: PropTypes.func,
    onTokens: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Types, this._getTypes())
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getTypes() {
    const { blocks, onCancel } = this.props
    return {
      blocks,
      onCancel,
      onChoose: this._handleType
    }
  }

  _getType(block) {
    const { cid, fields, properties, program, onTokens } = this.props
    return {
      cid,
      config: block.config,
      fields,
      program,
      properties,
      onCancel: this._handlePop,
      onChange: () => {},
      onDone: this._handleAdd.bind(this, block.type, block.action),
      onTokens
    }
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

  _handleAdd(type, action, config) {
    const { step, onAdd } = this.props
    onAdd(type, action, step.parent, step.answer, step.delta, config)
  }

  _handleType(block) {
    const { step, onAdd } = this.props
    if(block.form) return this._handlePush(block.form, this._getType(block))
    onAdd(block.type, block.action, step.parent, step.answer, step.delta, {})
  }

}

export default New
