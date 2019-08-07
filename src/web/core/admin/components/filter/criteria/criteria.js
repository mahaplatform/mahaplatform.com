import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Buttons from '../../buttons'
import Field from './field'
import Types from './types'
import Item from './item'
import React from 'react'
import New from './new'
import _ from 'lodash'

class Criteria extends React.Component {

  static contextTypes = {
    filter: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    criteria: PropTypes.object,
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    id: PropTypes.number,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onCreate: PropTypes.func,
    onRemove: PropTypes.func,
    onReset: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleEdit = this._handleEdit.bind(this)
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
            <div className="maha-criteria-footer">
              <Buttons { ...this._getButtons() } />
            </div>
          </div>
        }
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(!defaultValue) return onSet(null, { $and: [] })
    onSet(defaultValue.id, defaultValue.criteria)
  }

  componentDidUpdate(prevProps) {
    const { criteria } = this.props
    if(!_.isEqual(criteria, prevProps.criteria)) {
      this.props.onChange(criteria)
    }
  }

  _getButtons() {
    return {
      buttons: [
        this._getCancel(),
        this._getSave()
      ]
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
    const { onRemove } = this.props
    return {
      criteria,
      onAdd: this._handleAdd,
      onEdit: this._handleEdit,
      onRemove
    }
  }

  _getPanel() {
    return {
      title: 'Design Filter',
      color: 'lightgrey'
    }
  }

  _getSave() {
    const { criteria, code, id } = this.props
    const button = {
      label: 'Save',
      color: 'blue',
      disabled: criteria.$and.length === 0
    }
    if(!id) button.modal = <New code={ code } criteria={ criteria } />
    if(id) button.request = {
      endpoint: `/api/admin/${code}/filters/${id}`,
      method: 'PATCH',
      body: { criteria },
      onSuccess: () => this.context.filter.pop()
    }
    return button
  }

  _getTypes({ criterion, onDone }) {
    return {
      defaultValue: criterion,
      types: this.props.fields,
      onDone
    }
  }

  _handleAdd(cindex) {
    const { filter } = this.context
    filter.push({
      component: Types,
      props: this._getTypes({
        onDone: this._handleCreate.bind(this, cindex)
      })
    })
  }

  _handleCancel() {
    this.props.onReset()
    this.context.filter.pop()
  }

  _handleCreate(cindex, value) {
    this.props.onCreate(cindex, value)
  }

  _handleEdit(cindex, criterion) {
    const { filter } = this.context
    const key = Object.keys(criterion)[0]
    const field = this.props.fields.reduce((found, type) => {
      return found || type.fields.reduce((found, field) => {
        return found || (field.key === key ? field : null)
      }, null)
    }, null)
    filter.push({
      component: Field,
      props: {
        defaultValue: criterion[key],
        field,
        mode: 'edit',
        onDone: this._handleUpdate.bind(this, cindex)
      }
    })
  }

  _handleUpdate(cindex, value) {
    this.props.onUpdate(cindex, value)
  }

}

export default Criteria
