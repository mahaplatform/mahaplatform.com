import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import blocks from './blocks'
import React from 'react'
import _ from 'lodash'

class FlowchartDesigner extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    blocks: PropTypes.array,
    config: PropTypes.array,
    defaultValue: PropTypes.array,
    status: PropTypes.string,
    steps: PropTypes.array,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    const { status } = this.props
    return (
      <div className="flowchart-designer">
        <div className="flowchart-designer-main">
          <div className={`flowchart-designer-status ${status}`}>
            { this._getStatus() }
          </div>
          <div className="flowchart-designer-canvas">
            <Canvas { ...this._getCanvas() } />
          </div>
        </div>
        <div className="flowchart-designer-sidebar">
          <Sidebar { ...this._getSidebar() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onSet(this.props.defaultValue)
  }

  _getBlocks() {
    return this.props.blocks.map(block => {
      return {
        ...block,
        ...blocks[block.action]
      }
    })
  }

  _getCanvas() {
    const { active, config, onEdit, onRemove } = this.props
    return {
      active,
      blocks: this._getBlocks(),
      config,
      onAdd: this._handleAdd,
      onEdit,
      onRemove
    }
  }

  _getSidebar() {
    const { active, steps, onEdit, onUpdate } = this.props
    return {
      active,
      blocks: this._getBlocks(),
      steps,
      onEdit,
      onSave: this._handleSave,
      onUpdate
    }
  }

  _getStatus() {
    const { status } = this.props
    if(status === 'draft') {
      return 'This workflow is in draft mode'
    } else if(status === 'scheduled') {
      return 'This workflow is scheduled'
    } else if(status === 'sent') {
      return 'This workflow has been executed'
    } else if(status === 'active') {
      return 'This workflow is active'
    } else if(status === 'inactive') {
      return 'This workflow has been deactivated'
    }
  }

  _handleAdd(type, action, parent, answer, delta) {
    const { onAdd } = this.props
    const search = action ? { type, action } : { type }
    const blocks = this._getBlocks()
    const block = _.find(blocks, search)
    onAdd({
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      type: block.type,
      action: block.action,
      delta: parent ? delta : delta - 1,
      parent: parent ? parent.dataset.parent : null,
      answer: answer ? answer.dataset.answer : null,
      config: block.config || {}
    })
  }

  _handleSave() {
    const { steps, onSave } = this.props
    onSave(steps)
  }

}

export default FlowchartDesigner
