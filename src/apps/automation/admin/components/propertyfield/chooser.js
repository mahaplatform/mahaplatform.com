import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Chooser extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    properties: PropTypes.array,
    onChoose: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { properties } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-contactproperty-options">
          { properties.reduce((groups, group, groupIndex) => [
            ...groups,
            <div className="maha-criterion-type" key={`type_${groupIndex}`}>
              { group.label }
            </div>,
            ...group.fields.map((property, propertyIndex) => (
              <div className="maha-criterion-item" key={`type_${groupIndex}_property_${propertyIndex}`} onClick={ this._handleChoose.bind(this, property)}>
                { property.label }
              </div>
            ))
          ], []) }
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose Property',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChoose(property) {
    this.props.onChoose(property)
    this.context.form.pop()
  }

}

export default Chooser
