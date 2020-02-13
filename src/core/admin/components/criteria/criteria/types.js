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
          { types.reduce((items, type, index) => [
            ...items,
            <div className="maha-criterion-type" key={`type_${index}`}>
              { type.label }
            </div>,
            ...type.fields.map((field, index) => (
              <div className="maha-criterion-item" key={`field_${index}`} onClick={ this._handleField.bind(this, field)}>
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
      onChange : () => {},
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
