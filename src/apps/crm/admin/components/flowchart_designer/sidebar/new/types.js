import { ModalPanel } from 'maha-admin'
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
    const { blocks } = this.props
    const sections = [
      { title: 'Control', type: 'control' },
      { title: 'Contact', type: 'contact' },
      { title: 'Communication', type: 'communication' },
      { title: 'Administrative', type: 'administrative' }
    ]
    return (
      <ModalPanel { ...this._getPanel()}>
        <div className="flowchart-designer-blocks">
          { sections.map((section, index) => (
            <div className="flowchart-designer-blocks-section" key={`section_${index}`}>
              <div className="flowchart-designer-blocks-section-title">
                { section.title }
              </div>
              <div className="flowchart-designer-blocks-section-items">
                { blocks.filter(block => {
                  return block.type === section.type
                }).map((block, index) => (
                  <div className="flowchart-designer-block" key={`type_${index}`} onClick={ this._handleChoose.bind(this, block) }>
                    <div className={`flowchart-designer-block-icon flowchart-designer-icon-${block.type}`}>
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
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose Step Type',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChoose(block) {
    this.props.onChoose(block)
  }

}

export default Types
