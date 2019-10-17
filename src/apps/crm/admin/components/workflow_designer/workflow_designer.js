import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'

class VoiceDesigner extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    active: PropTypes.string,
    blocks: PropTypes.array,
    config: PropTypes.array,
    defaultValue: PropTypes.array,
    steps: PropTypes.array,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  render() {
    return (
      <div className="workflow-designer">
        <div className="workflow-designer-main">
          <Canvas { ...this._getCanvas() } />
        </div>
        <div className="workflow-designer-sidebar">
          <Sidebar { ...this._getSidebar() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onSet(this.props.defaultValue)
  }

  componentDidUpdate(prevProps) {}

  _getCanvas() {
    const { active, blocks, config, onAdd, onEdit, onRemove } = this.props
    return {
      active,
      blocks,
      config,
      onAdd,
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
      onUpdate
    }
  }

}

export default VoiceDesigner
