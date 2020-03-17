import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Types from './types'
import Item from './item'
import React from 'react'

class Overview extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    criteria: PropTypes.array,
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    panel: PropTypes.object,
    test: PropTypes.array,
    onChange: PropTypes.func,
    onCreate: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onRemove: PropTypes.func,
    onReset: PropTypes.func,
    onSet: PropTypes.func,
    onTest: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleCreate = this._handleCreate.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleTest = this._handleTest.bind(this)

  render() {
    const { criteria } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        { criteria &&
          <div className="maha-criteria">
            <div className="maha-criteria-body">
              <div className="maha-criteria-items">
                <Item { ...this._getItem(criteria[0]) } />
              </div>
            </div>
          </div>
        }
      </ModalPanel>
    )
  }

  _getItem(criteria) {
    const { fields, onRemove } = this.props
    return {
      criteria,
      fields,
      onAdd: this._handleAdd,
      onRemove
    }
  }

  _getPanel() {
    const { panel } = this.props
    return {
      ...panel,
      showHeader: panel !== undefined,
      color: 'grey'
    }
  }

  _getTypes(parent) {
    const { fields } = this.props
    return {
      parent,
      types: fields,
      onCancel: this._handleCancel,
      onChange: this._handleTest,
      onDone: this._handleCreate,
      onPop: this._handlePop,
      onPush: this._handlePush
    }
  }

  _handleAdd(parent) {
    this._handlePush(Types, this._getTypes(parent))
  }

  _handleCancel() {
    this.props.onReset()
    this._handlePop()
  }

  _handleCreate(value) {
    this.props.onCreate(value)
    this._handlePop(-2)
  }

  _handleTest(value) {
    this.props.onTest(value)
  }

  _handlePop(index = -1) {
    const { form } = this.context
    if(form) return form.pop(index)
    this.props.onPop(index)
  }

  _handlePush(component, props) {
    const { form } = this.context
    if(form) return form.push(component, props)
    this.props.onPush(component, props)
  }

}

export default Overview
