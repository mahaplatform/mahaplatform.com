import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Chooser extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    fields: PropTypes.array,
    onChoose: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { fields } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-contactfield-options">
          { fields.reduce((fields, field, typeIndex) => [
            ...fields,
            <div className="maha-criterion-type" key={`type_${typeIndex}`}>
              { field.label }
            </div>,
            ...field.fields.map((field, fieldIndex) => (
              <div className="maha-criterion-item" key={`type_${typeIndex}_field_${fieldIndex}`} onClick={ this._handleChoose.bind(this, field)}>
                { field.name }
              </div>
            ))
          ], []) }
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose Field',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChoose(field) {
    this.props.onChoose(field)
    this.context.form.pop()
  }

}

export default Chooser
