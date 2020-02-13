import PropTypes from 'prop-types'
import React from 'react'

class Item extends React.Component {

  static contextTypes = {}

  static propTypes = {
    cindex: PropTypes.array,
    criteria: PropTypes.object,
    fields: PropTypes.array,
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
        <div className={`maha-criteria-item ${key.replace('$', '')}`}>
          <div className="maha-criteria-item-box">
            { cindex.length > 0 &&
              <div className="maha-criteria-item-remove" onClick={ this._handleRemove.bind(this, cindex) }>
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
      <div className="maha-criteria-item">
        <div className="maha-criteria-item-box" onClick={ this._handleEdit.bind(this, cindex, criteria) }>
          { this._getDescription(key, operator) }
          <div className="maha-criteria-item-remove" onClick={ this._handleRemove.bind(this, cindex) }>
            <i className="fa fa-remove" />
          </div>
        </div>
      </div>
    )
  }

  _getItem(criteria, cindex, index) {
    const { fields, onAdd, onEdit, onRemove} = this.props
    return {
      cindex: [...cindex,...index],
      criteria,
      fields,
      onAdd,
      onEdit,
      onRemove
    }
  }

  _getDescription(key, operator) {
    const subject = this._getSubject(key)
    const verb = this._getOperator(operator)
    const object = this._getObject(key, operator)
    return `${subject} ${verb} ${object}`
  }

  _getSubject(key) {
    return key
  }

  _getObject(key, operator) {
    const { criteria } = this.props
    return criteria[key][operator]
  }

  _getOperator(operator) {
    if(operator == '$lk') return 'contains'
    if(operator == '$nlk') return 'does not contain'
    if(operator == '$kn') return 'is known'
    if(operator == '$nkn') return 'is not known'
    if(operator == '$eq') return 'is'
    if(operator == '$neq') return 'is not'
    if(operator == '$gt') return 'is greater than'
    if(operator == '$lt') return 'is less than'
    if(operator == '$gte') return 'is greater than or equal to'
    if(operator == '$lte') return 'is less than or equal to'
    if(operator == '$in') return 'is one of'
    if(operator == '$nin') return 'is not one of'
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
