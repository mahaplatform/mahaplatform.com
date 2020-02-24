import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Types from './types'
import Item from './item'
import React from 'react'

class Overview extends React.Component {

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
    const { fields, onPop, onPush } = this.props
    return {
      parent,
      types: fields,
      onCancel: this._handleCancel,
      onChange: this._handleTest,
      onDone: this._handleCreate,
      onPop,
      onPush
    }
  }

  _handleAdd(parent) {
    this.props.onPush(Types, this._getTypes(parent))
  }

  _handleCancel() {
    this.props.onReset()
    this.props.onPop()
  }

  _handleCreate(value) {
    this.props.onCreate(value)
    this.props.onPop(-2)
  }

  _handleTest(value) {
    this.props.onTest(value)
  }

}

export default Overview
