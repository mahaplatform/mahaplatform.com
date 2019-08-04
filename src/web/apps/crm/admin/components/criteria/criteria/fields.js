import { ModalPanel } from 'maha-admin'
import Text from './text'
import PropTypes from 'prop-types'
import React from 'react'

class Fields extends React.PureComponent {

  static contextTypes = {
    criteria: PropTypes.object
  }

  static propTypes = {
    type: PropTypes.object,
    onCancel: PropTypes.func,
    onDone: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const { type } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="crm-criterion-items">
          { type.fields.map((field, index) => (
            <div className="crm-criterion-item" key={`field_${index}`} onClick={ this._handleField.bind(this, field)}>
              { field.label }
            </div>
          )) }
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    const { type } = this.props
    return {
      title: type.label,
      color: 'grey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.criteria.pop()
  }

  _getComponent(type) {
    if(type === 'text') return Text
  }

  _getField(field) {
    const { onDone } = this.props
    return {
      field,
      onDone
    }
  }

  _handleField(field) {
    const component = this._getComponent(field.type)
    this.context.criteria.push({
      component,
      props: this._getField(field)
    })
  }

}

export default Fields
