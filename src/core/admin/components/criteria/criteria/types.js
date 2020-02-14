import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'
import Field from './field'

class Types extends React.PureComponent {

  static propTypes = {
    types: PropTypes.array,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onPush: PropTypes.func,
    onPop: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const { types } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-items">
          <div className="maha-criterion-type">
            Conditional
          </div>
          <div className="maha-criterion-item" onClick={ this._handleConditional.bind(this, '$and') }>
            and
          </div>
          <div className="maha-criterion-item" onClick={ this._handleConditional.bind(this, '$or') }>
            or
          </div>
          { types.reduce((items, type, typeIndex) => [
            ...items,
            <div className="maha-criterion-type" key={`type_${typeIndex}`}>
              { type.label }
            </div>,
            ...type.fields.map((field, fieldIndex) => (
              <div className="maha-criterion-item" key={`type_${typeIndex}_field_${fieldIndex}`} onClick={ this._handleField.bind(this, field)}>
                { field.name }
              </div>
            ))
          ], []) }
        </div>
      </ModalPanel>
    )
  }

  _getField(field) {
    const { onCancel, onChange, onDone } = this.props
    return {
      field,
      onCancel,
      onChange,
      onDone
    }
  }

  _getPanel() {
    return {
      title: 'Add Criteria',
      color: 'grey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.props.onPop()
  }

  _handleConditional(type) {
    this.props.onDone({ [type]: [] })
    this.props.onPop(-1)
  }

  _handleField(field) {
    this.props.onPush(Field, this._getField(field))
  }

}

export default Types
