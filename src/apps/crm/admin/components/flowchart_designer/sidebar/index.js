import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Content from './content'
import Tokens from './tokens'
import React from 'react'
import New from './new'
import _ from 'lodash'

class Sidebar extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    blocks: PropTypes.array,
    campaign: PropTypes.object,
    changes: PropTypes.number,
    cid: PropTypes.string,
    fields: PropTypes.array,
    program: PropTypes.object,
    properties: PropTypes.array,
    status: PropTypes.string,
    steps: PropTypes.array,
    step: PropTypes.object,
    tokens: PropTypes.array,
    workflow: PropTypes.object,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onNew: PropTypes.func,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleTokens = this._handleTokens.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Content, this._getContent())
  }

  componentDidUpdate(prevProps) {
    const { active, step } = this.props
    if(active !== prevProps.active) {
      if(active === null) {
        this._handlePop()
      } else if(prevProps.active) {
        this._handlePop()
        setTimeout(this._handleEdit, 300)
      } else if(active) {
        this._handleEdit()
      }
    }
    if(!_.isEqual(step, prevProps.step) && step) {
      this._handleNew()
    }
  }

  _getContent() {
    const { blocks, changes, cid, status, onSave } = this.props
    return {
      blocks,
      changes,
      cid,
      status,
      onSave
    }
  }

  _getForm(step) {
    const { campaign, fields, program, properties, workflow } = this.props
    const { code, config } = step
    return {
      campaign,
      config,
      fields,
      properties,
      program,
      workflow,
      onCancel: this._handlePop,
      onTokens: this._handleTokens,
      onDone: this._handleUpdate.bind(this, code)
    }
  }

  _getNew() {
    const { cid, campaign, blocks, fields, program, properties, step, workflow } = this.props
    const { type, action } = step
    const block = _.find(blocks, { type, action })
    return {
      block,
      campaign,
      cid,
      fields,
      program,
      properties,
      step,
      workflow,
      onAdd: this._handleAdd,
      onCancel: this._handleCancel,
      onTokens: this._handleTokens,
      onDone: this._handleAdd
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getTokens() {
    const { tokens } = this.props
    return {
      tokens,
      onPop: this._handlePop
    }
  }

  _handleAdd(type, action, parent, answer, delta, config) {
    this.props.onAdd(type, action, parent, answer, delta, config)
    this._handlePop()
  }

  _handleCancel() {
    this.props.onNew(null)
    this._handlePop()
  }

  _handleEdit() {
    const { active, blocks, steps } = this.props
    const step = _.find(steps, { code: active })
    const { type, action } = step
    const search = action ? { type, action } : { type }
    const block = _.find(blocks, search)
    if(!block.form) return
    this._handlePush(block.form, this._getForm(step))
  }

  _handleNew() {
    this._handlePush(New, this._getNew())
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

  _handleTokens() {
    this._handlePush(Tokens, this._getTokens())
  }

  _handleUpdate(code, config) {
    this.props.onUpdate(code, config)
  }

}

export default Sidebar
