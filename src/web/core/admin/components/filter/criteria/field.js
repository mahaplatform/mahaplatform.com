import ModalPanel from '../../modal_panel'
import DateRange from './daterange'
import PropTypes from 'prop-types'
import Select from './select'
import React from 'react'
import Text from './text'

class Field extends React.PureComponent {

  static contextTypes = {
    filter: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.any,
    field: PropTypes.object,
    mode: PropTypes.string,
    onCancel: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { field } = this.props
    const Component = this._getComponent(field.type)
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-form">
          <Component { ...this._getProps() } />
        </div>
      </ModalPanel>

    )
  }

  _getComponent(type) {
    if(type === 'daterange') return DateRange
    if(type === 'select') return Select
    if(type === 'text') return Text
  }

  _getPanel() {
    const { field } = this.props
    return {
      title: field.label,
      color: 'lightgrey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _getProps() {
    const { defaultValue, field, mode } = this.props
    return {
      defaultValue,
      field,
      mode,
      onDone: this._handleDone
    }
  }

  _handleDone(value) {
    const { mode, field } = this.props
    this.props.onDone({ [field.key]: value })
    this.context.filter.pop(mode === 'edit' ? -1 : -2)
  }

  _handleCancel() {
    this.context.filter.pop(-1)
  }

}

export default Field
