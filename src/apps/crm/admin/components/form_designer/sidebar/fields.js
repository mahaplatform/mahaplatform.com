import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const fields = [
  { label: 'Text', icon: 'align-left', type: 'text' },
  { label: 'Radio Group', icon: 'check-circle', type: 'radiogroup' },
  { label: 'Checkboxes', icon: 'check-square', type: 'checkboxes' },
  { label: 'Dropdown', icon: 'caret-square-o-down', type: 'dropdown' },
  { label: 'File Upload', icon: 'cloud-upload', type: 'fileupload' }
]

class Content extends React.Component {

  static contextTypes = {}

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    onSave: PropTypes.func
  }

  static defaultProps = {}

  _handleDragStart = this._handleDragStart.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel()}>
        <div className="flowchart-designer-blocks">
          { fields.map((field, index) => (
            <div className="flowchart-designer-block" key={`field_${index}`} { ...this._getField() }>
              <div className="flowchart-designer-block-icon flowchart-designer-icon-action">
                <i className={`fa fa-fw fa-${ field.icon }`} />
              </div>
              <div className="flowchart-designer-block-label">
                { field.label }
              </div>
            </div>
          )) }
        </div>
      </ModalPanel>
    )
  }

  _getField(field) {
    return {
      draggable: true,
      onDragStart: this._handleDragStart.bind(this, field)
    }
  }

  _getPanel() {
    return {
      title: 'Form',
      buttons: [
        { label: 'Save', color: 'red', handler: this._handleSave }
      ]
    }
  }

  _handleDragStart(field, e) {
    e.dataTransfer.dropEffect = 'all'
    e.dataTransfer.setData('type', field.type)
  }

  _handleSave() {
    this.props.onSave()
  }

}

export default Content
