import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Content extends React.Component {

  static contextTypes = {}

  static propTypes = {
    blocks: PropTypes.array,
    cid: PropTypes.string,
    config: PropTypes.object
  }

  static defaultProps = {}

  _handleDragStart = this._handleDragStart.bind(this)

  render() {
    const { blocks } = this.props
    return (
      <div className="workflow-designer-blocks">
        { blocks.filter(block => {
          return !_.includes(['trigger','ending'], block.type)
        }).map((block, index) => (
          <div className="workflow-designer-block" key={`type_${index}`} { ...this._getBlockType(block) }>
            <div className={`workflow-designer-block-icon workflow-designer-icon-${block.type}`}>
              <i className={`fa fa-fw fa-${ block.icon }`} />
            </div>
            <div className="workflow-designer-block-label">
              { block.label }
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getBlockType(block) {
    return {
      draggable: true,
      onDragStart: this._handleDragStart.bind(this, block)
    }
  }

  _handleDragStart(block, e) {
    e.dataTransfer.dropEffect = 'all'
    e.dataTransfer.setData('type', block.type)
    e.dataTransfer.setData('action', block.action)
  }

}

export default Content
