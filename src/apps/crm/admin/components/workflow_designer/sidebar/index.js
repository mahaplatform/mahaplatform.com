import EnrollInWorkflow from './enroll_in_workflow'
import RemoveFromList from './remove_from_list'
import UpdateProperty from './update_property'
import UpdateInterest from './update_interest'
import AddToList from './add_to_list'
import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Content from './content'
import React from 'react'
import _ from 'lodash'

class Sidebar extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    blocks: PropTypes.array,
    steps: PropTypes.array,
    onEdit: PropTypes.func,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleDone = this._handleDone.bind(this)
  _handleEdit = this._handleEdit.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Content, this._getContent())
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props
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
  }

  _getComponent(block) {
    if(block.component) return block.component
    if(block.action === 'add_to_list') return AddToList
    if(block.action === 'enroll_in_workflow') return EnrollInWorkflow
    if(block.action === 'remove_from_list') return RemoveFromList
    if(block.action === 'update_interest') return UpdateInterest
    if(block.action === 'update_property') return UpdateProperty
    return null
  }

  _getContent() {
    const { blocks, onSave } = this.props
    return {
      blocks, onSave
    }
  }

  _getEdit(step) {
    const { code, config } = step
    return {
      config,
      onChange: this._handleUpdate.bind(this, code),
      onDone: this._handleDone
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
    this.props.onEdit(null)
  }

  _handleEdit() {
    const { active, blocks, steps } = this.props
    const step = _.find(steps, { code: active })
    const { type, action } = step
    const search = action ? { type, action } : { type }
    const block = _.find(blocks, search)
    const component = this._getComponent(block)
    if(component) this._handlePush(component, this._getEdit(step))
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

  _handleUpdate(code, config) {
    this.props.onUpdate(code, config)
  }

}

export default Sidebar
