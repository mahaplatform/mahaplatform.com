import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Content extends React.Component {

  static contextTypes = {}

  static propTypes = {
    blocks: PropTypes.array,
    cid: PropTypes.string,
    config: PropTypes.object,
    onSave: PropTypes.func
  }

  static defaultProps = {}

  _handleDragStart = this._handleDragStart.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    const { blocks } = this.props
    return (
      <ModalPanel { ...this._getPanel()}>
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
      </ModalPanel>
    )
  }

  _getBlockType(block) {
    return {
      draggable: true,
      onDragStart: this._handleDragStart.bind(this, block)
    }
  }

  _getPanel() {
    return {
      title: 'Workflow',
      buttons: [
        { label: 'Save', handler: this._handleSave }
      ]
    }
  }

  _handleDragStart(block, e) {
    e.dataTransfer.dropEffect = 'all'
    e.dataTransfer.setData('type', block.type)
    if(block.subtype) e.dataTransfer.setData('subtype', block.subtype)
  }

  _handleSave() {
    this.props.onSave()
  }

}

export default Content
