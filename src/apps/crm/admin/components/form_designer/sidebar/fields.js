import PropTypes from 'prop-types'
import React from 'react'

const fields = [
  { label: 'Text', icon: 'align-left', type: 'text' },
  { label: 'Textfield', icon: 'font', type: 'text' },
  { label: 'Radio Group', icon: 'check-circle', type: 'radiogroup' },
  { label: 'Checkboxes', icon: 'check-square', type: 'checkboxes' },
  { label: 'Dropdown', icon: 'caret-square-o-down', type: 'dropdown' },
  { label: 'File Upload', icon: 'cloud-upload', type: 'fileupload' },
  { label: 'Datefield', icon: 'calendar', type: 'datefield' },
  { label: 'Timefield', icon: 'clock-o', type: 'timefield' },
  { label: 'Productfield', icon: 'shopping-bag', type: 'productfield' },
  { label: 'Paymentfield', icon: 'dollar', type: 'paymentfield' }
]

class Fields extends React.Component {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object
  }

  static defaultProps = {}

  _handleDragStart = this._handleDragStart.bind(this)

  render() {
    return (
      <div className="flowchart-designer-blocks">
        { fields.map((field, index) => (
          <div className="flowchart-designer-block" key={`field_${index}`} { ...this._getField(field) }>
            <div className="flowchart-designer-block-icon flowchart-designer-icon-action">
              <i className={`fa fa-fw fa-${ field.icon }`} />
            </div>
            <div className="flowchart-designer-block-label">
              { field.label }
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getField(field) {
    return {
      draggable: true,
      onDragStart: this._handleDragStart.bind(this, field)
    }
  }

  _handleDragStart(field, e) {
    e.dataTransfer.dropEffect = 'all'
    e.dataTransfer.setData('type', field.type)
  }

}

export default Fields
