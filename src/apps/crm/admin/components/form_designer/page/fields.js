import PropTypes from 'prop-types'
import React from 'react'

class Fields extends React.Component {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array
  }

  static defaultProps = {}

  _handleDragStart = this._handleDragStart.bind(this)

  render() {
    const { fields } = this.props
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
