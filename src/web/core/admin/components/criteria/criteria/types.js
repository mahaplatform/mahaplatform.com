import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Fields from './fields'
import React from 'react'

class Types extends React.PureComponent {

  static contextTypes = {
    criteria: PropTypes.object
  }

  static propTypes = {
    types: PropTypes.array,
    onCancel: PropTypes.func,
    onDone: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const { types } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-items">
          <div className="maha-criterion-item" onClick={ this._handleConditional.bind(this, '$and') }>
            Conditional AND Field
          </div>
          <div className="maha-criterion-item" onClick={ this._handleConditional.bind(this, '$or') }>
            Conditional OR Field
          </div>
          { types.map((type, index) => (
            <div className="maha-criterion-item" key={`field_${index}`} onClick={ this._handleType.bind(this, type)}>
              { type.label }
            </div>
          )) }
        </div>
      </ModalPanel>
    )
  }

  _getFields(type) {
    const { onDone } = this.props
    return {
      type,
      onDone
    }
  }

  _getPanel() {
    return {
      title: 'Choose Criteria',
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
    this.context.criteria.pop(1)
  }

  _handleType(type) {
    this.context.criteria.push({
      component: Fields,
      props: this._getFields(type)
    })
  }

}

export default Types
