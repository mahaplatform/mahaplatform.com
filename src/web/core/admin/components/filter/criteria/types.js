import ModalPanel from '../../modal_panel'
import Buttons from '../../buttons'
import PropTypes from 'prop-types'
import React from 'react'
import Field from './field'

class Types extends React.PureComponent {

  static contextTypes = {
    filter: PropTypes.object
  }

  static propTypes = {
    types: PropTypes.array,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
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
        <div className="maha-criterion-footer">
          <Buttons { ...this._getButtons() } />
        </div>
      </ModalPanel>
    )
  }

  _getButtons() {
    return {
      buttons: [{
        label: 'Cancel',
        color: 'grey',
        handler: this._handleCancel
      },{
        label: 'Add Criteria',
        color: 'blue',
        disabled: true
      }]
    }
  }

  _getPanel() {
    return {
      title: 'Add Criteria',
      color: 'grey'
    }
  }

  _handleCancel() {
    this.context.filter.pop()
  }

  _handleConditional(type) {
    this.props.onDone({ [type]: [] })
    this.context.filter.pop(-1)
  }

  _handleField(field) {
    const { onCancel, onChange, onDone } = this.props
    this.context.filter.push({
      component: Field,
      props: {
        field,
        mode: 'add',
        onCancel,
        onChange,
        onDone
      }
    })
  }

}

export default Types
