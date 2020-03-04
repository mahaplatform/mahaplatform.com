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
    changes: PropTypes.number,
    cid: PropTypes.string,
    config: PropTypes.array,
    defaultValue: PropTypes.array,
    endpoint: PropTypes.string,
    fields: PropTypes.array,
    hovering: PropTypes.object,
    status: PropTypes.string,
    steps: PropTypes.array,
    step: PropTypes.object,
    tokens: PropTypes.array,
    workflow: PropTypes.object,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onHover: PropTypes.func,
    onNewStep: PropTypes.func,
    onRemove: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleHover = _.throttle(this._handleHover.bind(this), 100)
  _handleNew = this._handleNew.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    return (
      <div className="flowchart-designer">
        <div className="flowchart-designer-main">
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
    return this.props.blocks.map(block => ({
      ...block,
      ...blocks[block.action]
    }))
  }

  _getCanvas() {
    const { active, config, fields, hovering, onEdit, onRemove } = this.props
    return {
      active,
      blocks: this._getBlocks(),
      boxes: config,
      fields,
      hovering,
      onAdd: this._handleAdd,
      onEdit,
      onHover: this._handleHover,
      onNew: this._handleNew,
      onRemove
    }
  }

  _getSidebar() {
    const { active, changes, cid, fields, status, steps, step, tokens, workflow, onEdit, onUpdate } = this.props
    return {
      active,
      blocks: this._getBlocks(),
      changes,
      cid,
      fields,
      status,
      steps,
      step,
      tokens,
      workflow,
      onAdd: this._handleAdd,
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

  _handleNew(parent, answer, delta) {
    this.props.onNewStep(parent, answer, delta)
  }

  _handleAdd(type, action, parent, answer, delta, config) {
    const { onAdd } = this.props
    const search = action ? { type, action } : { type }
    const blocks = this._getBlocks()
    const block = _.find(blocks, search)
    onAdd({
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      type: block.type,
      action: block.action,
      delta: parent ? delta : delta - 1,
      parent,
      answer,
      config
    })
  }

  _handleHover(hovering) {
    this.props.onHover(hovering)
  }

  _handleSave() {
    const { endpoint, steps, onSave } = this.props
    onSave(endpoint, steps)
  }

}

export default FlowchartDesigner
