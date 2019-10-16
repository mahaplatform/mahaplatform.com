import PropTypes from 'prop-types'
import React from 'react'

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
      <div className="designer-content-types">
        { blocks.map((block, index) => (
          <div className="designer-content-type" key={`type_${index}`} { ...this._getBlockType(block) }>
            <div className={`designer-content-type-icon ${block.color}`}>
              <i className={`fa fa-fw fa-${ block.icon }`} />
            </div>
            <div className="designer-content-type-label">
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
  }

}

export default Content
