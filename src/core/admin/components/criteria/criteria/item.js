import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const comparisons = {
  $lk: 'contains',
  $nlk: 'does not contain',
  $kn: 'is known',
  $nkn: 'is not known',
  $eq: 'is',
  $neq: 'is not',
  $gt: 'is greater than',
  $lt: 'is less than',
  $gte: 'is greater than or equal to',
  $lte: 'is less than or equal to',
  $in: 'is',
  $nin: 'is not',
  $ck: 'is checked',
  $nck: 'is not checked',
  $ply: 'is inside polygon',
  $nply: 'is not inside polygon'
}

class Item extends React.Component {

  static propTypes = {
    criteria: PropTypes.object,
    fields: PropTypes.array,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func
  }

  render() {
    const { criteria } = this.props
    if(_.includes(['$and','$or'], criteria.operator)) {
      return (
        <div className={`maha-criteria-item ${criteria.operator.replace('$', '')}`}>
          <div className="maha-criteria-item-box">
            { criteria.index > 0 &&
              <div className="maha-criteria-item-remove" onClick={ this._handleRemove.bind(this, criteria) }>
                <i className="fa fa-remove" />
              </div>
            }
            { criteria.items.map((item, index) => (
              <Item { ...this._getItem(item) } key={`item_${index}`} />
            )) }
            <div className="ui mini compact button" onClick={ this._handleNew.bind(this, criteria) }>
              <i className="fa fa-plus" /> Add Criteria
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="maha-criteria-item">
        <div className="maha-criteria-item-box">
          <span dangerouslySetInnerHTML={{ __html: this._getDescription(criteria) }} />
          <div className="maha-criteria-item-remove" onClick={ this._handleRemove.bind(this, criteria) }>
            <i className="fa fa-remove" />
          </div>
        </div>
      </div>
    )
  }

  _getItem(criteria) {
    const { fields, onAdd, onRemove} = this.props
    return {
      criteria,
      fields,
      onAdd,
      onRemove
    }
  }

  _getFields() {
    const { fields } = this.props
    return fields.reduce((fields, segment) => [
      ...fields,
      ...segment.fields
    ], [])
  }

  _getDescription(item) {
    const fields = this._getFields()
    const field = _.find(fields, { key: item.field })
    const phrase = []
    if(field.subject !== false) phrase.push(`<strong>${field.name}</strong>`)
    const operator = this._getOperator(field, item.operator)
    const value = this._getValue(item)
    if(operator) phrase.push(operator)
    if(value) phrase.push(value)
    return phrase.join(' ')
  }

  _getOxford(arr, conjunction) {
    if(arr.length === 2) return arr.join(` ${conjunction} `)
    return [
      arr.slice(0, -1).join(', '),
      arr.slice(-1)[0]
    ].join(`, ${conjunction} `)
  }

  _getOperator(field, operator) {
    if(field.comparisons) {
      const comparison = _.find(field.comparisons, { value: operator })
      if(comparison) return comparison.text
    }
    return comparisons[operator]
  }

  _getValue(item) {
    if(item.data) {
      if(item.data.text) return item.data.text
      const items = _.castArray(item.data).map(record => `<strong>${record.text}</strong>`)
      const word = item.operator === '$nin' ? 'neither' : 'either'
      const conjunction = item.operator === '$nin' ? 'nor' : 'or'
      return items.length > 1 ? `${word} ${this._getOxford(items, conjunction)}` : items[0]
    }
    return item.value
  }

  _handleNew(criteria) {
    this.props.onAdd(criteria.code)
  }

  _handleRemove(criteria, e) {
    e.stopPropagation()
    this.props.onRemove(criteria.index)
  }
}

export default Item
