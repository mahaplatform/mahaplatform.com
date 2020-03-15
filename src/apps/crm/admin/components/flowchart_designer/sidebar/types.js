import PropTypes from 'prop-types'
import React from 'react'

class Types extends React.Component {

  static propTypes = {
    blocks: PropTypes.array,
    onCancel: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const sections = this._getSections()
    return (
      <div className="flowchart-designer-blocks">
        { sections.map((section, index) => (
          <div className="flowchart-designer-blocks-section" key={`section_${index}`}>
            <div className="flowchart-designer-blocks-section-title">
              { section.title }
            </div>
            <div className="flowchart-designer-blocks-section-items">
              { section.blocks.map((block, index) => (
                <div key={`type_${index}`} { ...this._getBlock(block )}>
                  <div className={`flowchart-designer-block-icon ${block.type}`}>
                    <i className={`fa fa-fw fa-${ block.icon }`} />
                  </div>
                  <div className="flowchart-designer-block-label">
                    { block.label }
                  </div>
                </div>
              )) }
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getBlock(block) {
    return {
      className: 'flowchart-designer-block',
      draggable: true,
      onClick: this._handleChoose.bind(this, block),
      onDragStart: this._handleDragStart.bind(this, block)
    }
  }

  _getSections() {
    const { blocks } = this.props
    const sections = [
      { title: 'Voice', type: 'voice' },
      { title: 'SMS', type: 'sms' },
      { title: 'Control', type: 'control' },
      { title: 'Contact', type: 'contact' },
      { title: 'Communication', type: 'communication' },
      { title: 'Administrative', type: 'administrative' }
    ]
    return sections.map(section => ({
      ...section,
      blocks: blocks.filter(block => {
        return block.type === section.type
      })
    })).filter(section => {
      return section.blocks.length > 0
    })
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChoose(block) {
    this.props.onChoose(block)
  }

  _handleDragStart(block, e) {
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'all'
    e.dataTransfer.setData('type', block.type)
    if(block.action) e.dataTransfer.setData('action', block.action)
    const dragImage = document.createElement('div')
    const dragIcon = document.createElement('i')
    dragImage.className = `flowchart-designer-block-draglayer ${block.type}`
    dragIcon.className = `fa fa-${block.icon}`
    dragImage.appendChild(dragIcon)
    document.body.appendChild(dragImage)
    e.dataTransfer.setDragImage(dragImage, 20, 20)
  }

}

export default Types
