import PropTypes from 'prop-types'
import Trunk from './trunk'
import React from 'react'

class Canvas extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    blocks: PropTypes.array,
    config: PropTypes.array,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func
  }

  render() {
    return (
      <div className="flowchart-canvas">
        <div className="workflow">
          <Trunk { ...this._getTrunk() } />
        </div>
      </div>
    )
  }

  _getTrunk() {
    const { active, blocks, config, onAdd, onEdit, onRemove } = this.props
    return {
      active,
      boxes: config,
      blocks,
      onAdd,
      onEdit,
      onRemove
    }
  }
}

export default Canvas
