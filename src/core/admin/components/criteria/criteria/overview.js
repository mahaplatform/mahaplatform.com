import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Types from './types'
import Item from './item'
import React from 'react'

class Overview extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    criteria: PropTypes.object,
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    panel: PropTypes.object,
    test: PropTypes.object,
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

  render() {
    const { criteria } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        { criteria &&
          <div className="maha-criteria">
            <div className="maha-criteria-body">
              <div className="maha-criteria-items">
                { Object.keys(criteria).length > 0 &&
                  <Item { ...this._getItem(criteria) } />
                }
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

  _getTypes(cindex) {
    const { fields, onPop, onPush } = this.props
    return {
      types: fields,
      onCancel: this._handleCancel,
      onChange: this._handleTest.bind(this, cindex),
      onDone: this._handleCreate.bind(this, cindex),
      onPop,
      onPush
    }
  }

  _handleAdd(cindex) {
    this.props.onPush(Types, this._getTypes(cindex))
  }

  _handleCancel() {
    this.props.onPop()
  }

  _handleCreate(cindex, value) {
    this.props.onCreate(cindex, value)
    this.props.onPop(-2)
  }

  _handleTest(cindex, value) {
    this.props.onTest(cindex, value)
  }

}

const mapStateToProps = (state, props) => ({
  criteria: state.maha.criteria[props.cid].criteria
})

export default connect(mapStateToProps)(Overview)
