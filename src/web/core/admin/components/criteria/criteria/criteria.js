import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Button from '../../button'
import Types from './types'
import Item from './item'
import React from 'react'
import Text from './text'
import New from './new'
import _ from 'lodash'

class Criteria extends React.Component {

  static contextTypes = {
    criteria: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.object,
    criteria: PropTypes.object,
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onCreate: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleBack = this._handleBack.bind(this)
  _handleEdit = this._handleEdit.bind(this)

  render() {
    const { criteria } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criteria">
          <div className="maha-criteria-body">
            <div className="maha-criteria-items">
              { criteria && Object.keys(criteria).length > 0 &&
                <Item { ...this._getItem(criteria) } />
              }
            </div>
          </div>
          <div className="maha-criteria-footer">
            <Button { ...this._getButton() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { criteria } = this.props
    if(!_.isEqual(criteria, prevProps.criteria)) {
      this.props.onChange(criteria)
    }
  }

  _getButton() {
    const { criteria, code } = this.props
    return {
      label: 'Save Fitler',
      color: 'red',
      disabled: criteria.$and.length === 0,
      modal: <New code={ code } criteria={ criteria } />
    }
  }

  _getComponent(type) {
    if(type === 'text') return Text
  }

  _getPanel() {
    return {
      title: 'Filter Results',
      color: 'lightgrey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getTypes({ criterion, onDone }) {
    return {
      defaultValue: criterion,
      types: this.props.fields,
      onDone
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

  _handleAdd(cindex) {
    const { criteria } = this.context
    criteria.push({
      component: Types,
      props: this._getTypes({
        mode: 'add',
        onDone: this._handleCreate.bind(this, cindex)
      })
    })
  }

  _handleBack() {
    this.context.criteria.pop()
  }

  _handleCreate(cindex, value) {
    this.props.onCreate(cindex, value)
  }

  _handleEdit(cindex, criterion) {
    const { criteria } = this.context
    const key = Object.keys(criterion)[0]
    const field = this.props.fields.reduce((found, type) => {
      return found || type.fields.reduce((found, field) => {
        return found || (field.code === key ? field : null)
      }, null)
    }, null)
    criteria.push({
      component: this._getComponent(field.type),
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
