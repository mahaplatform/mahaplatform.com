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
    onUpdate: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Content, this._getContent())
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props
    if(active !== prevProps.active) {
      if(active === null) return this._handlePop()
      this._handleEdit()
    }
  }

  _getContent() {
    const { blocks } = this.props
    return {
      blocks
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
    const block = _.find(blocks, { type: step.type, action: step.config.action })
    this._handlePush(block.component, this._getEdit(step.config))
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
