import Criterion from '../criterion'
import PropTypes from 'prop-types'
import Item from './item'
import React from 'react'
import _ from 'lodash'

class Criteria extends React.Component {

  static contextTypes = {
    criteria: PropTypes.object
  }

  static propTypes = {
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
  _handleEdit = this._handleEdit.bind(this)

  render() {
    const { criteria } = this.props
    return (
      <div className="crm-criteria">
        <div className="crm-criteria-items">
          { criteria && Object.keys(criteria).length > 0 &&
            <Item { ...this._getItem(criteria) } />
          }
        </div>
      </div>
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

  _getCriterion({ criterion, onDone }) {
    const { fields, onCancel } = this.props
    return {
      defaultValue: criterion,
      fields,
      onCancel,
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
    const onDone = this._handleCreate.bind(this, cindex)
    criteria.push({ component: Criterion, props: this._getCriterion({ onDone }) })
  }

  _handleCreate(cindex, value) {
    this.props.onCreate(cindex, value)
    this.context.criteria.pop()
  }

  _handleEdit(cindex, criterion) {
    const { criteria } = this.context
    const onDone = this._handleCreate.bind(this, cindex)
    criteria.push({ component: Criterion, props: this._getCriterion({ criterion, onDone }) })
  }

  _handleUpdate(cindex, value) {
    this.props.onUpdate(cindex, value)
    this.context.criteria.pop()
  }

}

export default Criteria
