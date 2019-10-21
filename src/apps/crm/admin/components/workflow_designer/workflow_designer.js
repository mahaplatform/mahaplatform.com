import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'
import _ from 'lodash'

class VoiceDesigner extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    blocks: PropTypes.array,
    config: PropTypes.array,
    defaultValue: PropTypes.array,
    status: PropTypes.array,
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
    return (
      <div className="workflow-designer">
        <div className="workflow-designer-main">
          <div className="workflow-designer-status">
            { this._getStatus() }
          </div>
          <div className="workflow-designer-canvas">
            <Canvas { ...this._getCanvas() } />
          </div>
        </div>
        <div className="workflow-designer-sidebar">
          <Sidebar { ...this._getSidebar() } />
        </div>
      </div>
    )
  }

  _getStatus() {
    const { status } = this.props
    if(status === 'draft') {
      return 'This campaign is in draft mode'
    } else if(status === 'scheduled') {
      return 'This campaign is scheduled'
    } else if(status === 'sent') {
      return 'This campaign has been sent'
    } else if(status === 'active') {
      return 'This campaign is active'
    } else if(status === 'inactive') {
      return 'This campaign has been deactivated'
    }
  }

  componentDidMount() {
    this.props.onSet(this.props.defaultValue)
  }

  _getCanvas() {
    const { active, blocks, config, onEdit, onRemove } = this.props
    return {
      active,
      blocks,
      config,
      onAdd: this._handleAdd,
      onEdit,
      onRemove
    }
  }

  _getSidebar() {
    const { active, blocks, steps, onEdit, onUpdate } = this.props
    return {
      active,
      blocks,
      steps,
      onEdit,
      onSave: this._handleSave,
      onUpdate
    }
  }

  _handleAdd(type, action, parent, answer, delta) {
    const { blocks, onAdd } = this.props
    const search = action ? { type, action } : { type }
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

export default VoiceDesigner
