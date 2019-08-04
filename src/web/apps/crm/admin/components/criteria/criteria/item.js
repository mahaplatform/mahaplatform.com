import PropTypes from 'prop-types'
import React from 'react'

class Item extends React.Component {

  static contextTypes = {}

  static propTypes = {
    cindex: PropTypes.array,
    criteria: PropTypes.object,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func
  }

  static defaultProps = {
    cindex: []
  }

  render() {
    const { cindex, criteria } = this.props
    const key = Object.keys(criteria)[0]
    if(key === '$and' || key === '$or') {
      return (
        <div className={`crm-criteria-item ${key.replace('$', '')}`}>
          <div className="crm-criteria-item-box">
            { cindex.length > 0 &&
              <div className="crm-criteria-item-remove" onClick={ this._handleRemove.bind(this, cindex) }>
                <i className="fa fa-remove" />
              </div>
            }
            { criteria[key].map((item, index) => (
              <Item { ...this._getItem(item, cindex, [key,index]) } key={`item_${index}`} />
            )) }
            <div className="ui mini compact button" onClick={ this._handleNew.bind(this, cindex, key) }>
              <i className="fa fa-plus" /> Add Criteria
            </div>
          </div>
        </div>
      )
    }
    const operator = Object.keys(criteria[key])[0]
    return (
      <div className="crm-criteria-item">
        <div className="crm-criteria-item-box" onClick={ this._handleEdit.bind(this, cindex, criteria) }>
          The contact property <strong className="crm-criteria-property">{ key }</strong> { this._getOperator(operator) } <strong>{ criteria[key][operator] }</strong>
          <div className="crm-criteria-item-remove" onClick={ this._handleRemove.bind(this, cindex) }>
            <i className="fa fa-remove" />
          </div>
        </div>
      </div>
    )
  }

  _getItem(criteria, cindex, index) {
    const { onAdd, onEdit, onRemove} = this.props
    return {
      cindex: [...cindex,...index],
      criteria,
      onAdd,
      onEdit,
      onRemove
    }
  }

  _getOperator(operator) {
    if(operator == '$ct') return 'contains'
    if(operator == '$eq') return 'equals'
    if(operator == '$neq') return 'doesn\'t equal'
    if(operator == '$gt') return 'is greater than'
    if(operator == '$lt') return 'is less than'
    if(operator == '$gte') return 'is greater than or equal to'
    if(operator == '$lte') return 'is less than or equal to'
  }

  _handleNew(cindex, key) {
    this.props.onAdd([...cindex,key])
  }

  _handleEdit(cindex, criterion) {
    this.props.onEdit(cindex, criterion)
  }

  _handleRemove(cindex, e) {
    e.stopPropagation()
    this.props.onRemove(cindex)
  }
}

export default Item
