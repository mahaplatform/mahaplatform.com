import { AssetThumbnail } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class DragLayer extends React.Component {

  static propTypes = {
    item: PropTypes.object,
    position: PropTypes.object,
    selected: PropTypes.array
  }

  render() {
    const { item, selected } = this.props
    return (
      <div className="drive-drag-layer" style={ this._getStyle() }>
        <div className="drive-drag-layer-inner">
          { selected && selected.length > 1 &&
            <div className="drive-drag-layer-count">
              { selected.length }
            </div>
          }
          <div className="drive-drag-layer-thumbnail">
            { item.type === 'folder' ?
              <i className="fa fa-fw fa-folder" /> :
              <AssetThumbnail { ...item.asset } />
            }
          </div>
          { item.label }
        </div>
      </div>
    )
  }

  _getStyle() {
    const { position } = this.props
    if(!position) return {}
    const x = position.x - 50
    const y = position.y - 90
    const transform = `translate(${x}px, ${y}px)`
    return {
      transform,
      WebkitTransform: transform
    }
  }

}

export default DragLayer
