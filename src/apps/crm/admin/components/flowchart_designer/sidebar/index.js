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
    workflow: PropTypes.object,
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

  _getContent() {
    const { blocks, onSave } = this.props
    return {
      blocks, onSave
    }
  }

  _getForm(step) {
    const fields = [
      { code: 'abs648', name: 'First Name', type: 'textfield' },
      { code: 'zac6f4', name: 'Last Name', type: 'textfield' }
    ]
    const { workflow } = this.props
    const { code, config } = step
    return {
      config,
      fields,
      workflow,
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
    if(!block.form) return
    this._handlePush(block.form, this._getForm(step))
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
