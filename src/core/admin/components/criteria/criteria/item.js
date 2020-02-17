import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const comparisons = {
  $lk: 'contains',
  $nlk: 'does not contain',
  $kn: 'is known',
  $nkn: 'is not known',
  $eq: 'equals',
  $neq: 'does not equal',
  $gt: 'is greater than',
  $lt: 'is less than',
  $gte: 'is greater than or equal to',
  $lte: 'is less than or equal to',
  $in: 'is one of',
  $nin: 'is not one of'
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
    phrase.push(this._getOperator(field, item.operator))
    phrase.push(this._getObject(item))
    return phrase.join(' ')
  }

  _getOxford(arr, conjunction) {
    return [
      arr.slice(0, -1).join(', '),
      arr.slice(-1)[0]
    ].join(', or ')
  }

  _getObject(item) {
    if(item.data) {
      const items = _.castArray(item.data).map(record => `<strong>${record.text}</strong>`)
      return items.length > 1 ? `either ${this._getOxford(items)}` : items[0]
    }
    return item.value
  }

  _getOperator(field, operator) {
    if(field.comparisons) {
      const comparison = _.find(field.comparisons, { value: operator })
      if(comparison) return comparison.text
    }
    return comparisons[operator]
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
