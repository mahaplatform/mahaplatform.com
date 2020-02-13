import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Types from './types'
import Item from './item'
import React from 'react'
import _ from 'lodash'

class Overview extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    criteria: PropTypes.object,
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    panel: PropTypes.object,
    onChange: PropTypes.func,
    onCreate: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onRemove: PropTypes.func,
    onReset: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    fields: [],
    onChange: () => {}
  }

  _handleAdd = this._handleAdd.bind(this)

  render() {
    const { criteria, filter } = this.props
    const { user } = this.context.admin
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
            { filter && filter.owner && filter.owner.id !== user.id &&
              <div className="maha-criteria-alert">
                <i className="fa fa-lock" />
                This filter was shared by { filter.owner.full_name }
              </div>
            }
          </div>
        }
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(!defaultValue) return onSet({ $and: [] })
    onSet(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { criteria } = this.props
    if(!_.isEqual(criteria, prevProps.criteria)) {
      this.props.onChange(criteria)
    }
  }

  _getCancel() {
    return {
      label: 'Cancel',
      color: 'grey',
      handler: this._handleCancel
    }
  }

  _getItem(criteria) {
    const { fields, onRemove } = this.props
    return {
      criteria,
      fields,
      onAdd: this._handleAdd,
      onEdit: this._handleEdit,
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
      onDone: this._handleCreate.bind(this, cindex),
      onPop,
      onPush
    }
  }

  _handleAdd(cindex) {
    this.props.onPush(Types, this._getTypes(cindex))
  }

  _handleCancel() {
    this.props.onReset()
    this.context.filter.pop()
  }

  _handleCreate(cindex, value) {
    this.props.onCreate(cindex, value)
    this.props.onPop(-2)
  }

}

const mapStateToProps = (state, props) => ({
  criteria: state.maha.criteria[props.cid].criteria
})

export default connect(mapStateToProps)(Overview)
