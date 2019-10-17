import PropTypes from 'prop-types'
import Trunk from './trunk'
import React from 'react'

class Canvas extends React.PureComponent {

  static propTypes = {
    blocks: PropTypes.array,
    config: PropTypes.array,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func
  }

  render() {
    return (
      <div className="workflow-canvas">
        <div className="workflow">
          <Trunk { ...this._getTrunk() } />
        </div>
      </div>
    )
  }

  _getTrunk() {
    const { blocks, config, onAdd, onRemove } = this.props
    return {
      boxes: config,
      blocks,
      onAdd,
      onRemove
    }
  }
}

export default Canvas
