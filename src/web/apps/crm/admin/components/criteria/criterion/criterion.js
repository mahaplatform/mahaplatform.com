import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Criterion extends React.PureComponent {

  static contextTypes = {
    criteria: PropTypes.object
  }

  static propTypes = {
    fields: PropTypes.array,
    onDone: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { fields } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="crm-criterion">
          <div className="crm-criterion-fields">
            <div className="crm-criterion-field" onClick={ this._handleConditional.bind(this, '$and') }>
              Conditional AND Field
            </div>
            <div className="crm-criterion-field" onClick={ this._handleConditional.bind(this, '$or') }>
              Conditional OR Field
            </div>
            { fields.map((field, index) => (
              <div className="crm-criterion-field" key={`field_${index}`} onClick={ this._handleField.bind(this, field)}>
                { field.label }
              </div>
            )) }
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Contact Properties',
      color: 'grey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.criteria.pop()
  }

  _handleConditional(type) {
    this.props.onDone({ [type]: [] })
  }

  _handleField(field) {
    this.props.onDone({ [field.code]: { $eq: 'mochini@gmail.com' } })
  }

  _handleDone() {
    this.props.onDone({ email: { $eq: 'mochini@gmail.com' } })
  }


}

export default Criterion
