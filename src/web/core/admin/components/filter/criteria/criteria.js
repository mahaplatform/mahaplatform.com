import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Buttons from '../../buttons'
import Field from './field'
import Types from './types'
import Edit from './edit'
import Item from './item'
import React from 'react'
import New from './new'
import _ from 'lodash'

class Criteria extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object,
    filter: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    criteria: PropTypes.object,
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    filter: PropTypes.object,
    test: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onCreate: PropTypes.func,
    onRemove: PropTypes.func,
    onReset: PropTypes.func,
    onSet: PropTypes.func,
    onTest: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleRefresh = this._handleRefresh.bind(this)

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
            { (!filter || (filter && filter.owner.id === user.id)) &&
              <div className="maha-criteria-footer">
                <Buttons { ...this._getButtons() } />
              </div>
            }
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
    if(!defaultValue) return onSet(null, { $and: [] })
    onSet(defaultValue, defaultValue.criteria)
  }

  componentDidUpdate(prevProps) {
    const { criteria, test } = this.props
    if(!_.isEqual(criteria, prevProps.criteria)) {
      this.props.onChange(criteria)
    }
    if(!_.isEqual(test, prevProps.test)) {
      this.props.onChange(test)
    }
  }

  _getButtons() {
    const { user } = this.context.admin
    const { filter } = this.props
    const buttons = []
    if(filter && filter.owner.id === user.id) {
      buttons.push(this._getDelete())
      buttons.push(this._getEdit())
    }
    buttons.push(this._getSave())
    return { buttons }
  }

  _getCancel() {
    return {
      label: 'Cancel',
      color: 'grey',
      handler: this._handleCancel
    }
  }

  _getDelete() {
    const { filter } = this.props
    return {
      label: 'Delete',
      color: 'red',
      confirm: 'Are you sure you want to delete this filter?',
      request: {
        method: 'DELETE',
        endpoint: `/api/admin/${filter.code}/filters/${filter.id}`,
        onSuccess: () => {
          this.props.onReset()
          this.context.flash.set('success', 'The filter was successfully deleted')
          this.context.filter.pop()
        }
      }
    }
  }

  _getEdit() {
    const { filter } = this.props
    return {
      label: 'Edit',
      color: 'blue',
      modal: <Edit filter={ filter } />
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
    const { filter } = this.props
    return {
      title: filter ? filter.title : 'New Filter',
      color: 'grey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _getSave() {
    const { criteria, code, filter } = this.props
    const id = filter ? filter.id : null
    return {
      label: 'Save',
      color: 'blue',
      disabled: criteria.$and.length === 0,
      modal: !id ? <New code={ code } criteria={ criteria } /> : null,
      request: id ? {
        endpoint: `/api/admin/${code}/filters/${id}`,
        method: 'PATCH',
        body: { criteria },
        onSuccess: () => {
          this.context.flash.set('success', 'This filter was successfully saved')
        }
      } : null
    }
  }

  _handleAdd(cindex) {
    const { filter } = this.context
    const { fields } = this.props
    filter.push({
      component: Types,
      props: {
        mode: 'add',
        types: fields,
        onCancel: this._handleRefresh,
        onChange: this._handleTest.bind(this, 'add', cindex),
        onDone: this._handleCreate.bind(this, cindex)
      }
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
        onCancel: this._handleRefresh,
        onChange: this._handleTest.bind(this, 'edit', cindex),
        onDone: this._handleUpdate.bind(this, cindex)
      }
    })
  }

  _handleRefresh() {
    const { criteria } = this.props
    this.props.onChange(criteria)
  }

  _handleTest(mode, cindex, value) {
    this.props.onTest(mode, cindex, value)
  }

  _handleUpdate(cindex, value) {
    this.props.onUpdate(cindex, value)
  }

}

export default Criteria
