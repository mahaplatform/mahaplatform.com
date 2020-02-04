import PropTypes from 'prop-types'
import Trunk from './trunk'
import React from 'react'

class Canvas extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    blocks: PropTypes.array,
    fields: PropTypes.array,
    config: PropTypes.array,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onMove: PropTypes.func,
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
    const { active, blocks, config, fields, onAdd, onEdit, onMove, onRemove } = this.props
    return {
      active,
      boxes: config,
      blocks,
      fields,
      onAdd,
      onEdit,
      onMove,
      onRemove
    }
  }
}

export default Canvas
