import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Field from './field'
import React from 'react'
import _ from 'lodash'

class Types extends React.PureComponent {

  static propTypes = {
    parent: PropTypes.string,
    types: PropTypes.array,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onPush: PropTypes.func,
    onPop: PropTypes.func
  }

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
            AND
          </div>
          <div className="maha-criterion-item" onClick={ this._handleConditional.bind(this, '$or') }>
            OR
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
    const { parent, onCancel } = this.props
    return {
      field,
      onCancel,
      onChange: this._handleChange.bind(this, field, parent),
      onDone: this._handleDone.bind(this, field, parent)
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

  _handleChange(field, parent, value) {
    this.props.onChange({
      field: field.key,
      parent,
      ...value
    })
  }

  _handleConditional(operator) {
    const { parent } = this.props
    this.props.onDone({
      code: _.random(100000, 999999).toString(36),
      parent,
      field: null,
      operator,
      value: null,
      data: null
    })
    this.props.onPop(-1)
  }

  _handleDone(field, parent, value) {
    this.props.onDone({
      field: field.key,
      parent,
      ...value
    })
  }

  _handleField(field) {
    this.props.onPush(Field, this._getField(field))
  }

}

export default Types
