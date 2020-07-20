import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

const Content = ({ data, field }) => {
  const value = data[field.code]
  const type = field.type === 'contactfield' ? field.contactfield.type : field.type
  if(_.isNil(value)) return null
  if(_.includes(['paymentfield','productfield'], type)) {
    return (
      <table className="ui unstackable compact table">
        <thead>
          <tr>
            <th>Item</th>
            <th className="collapsing">Total</th>
          </tr>
        </thead>
        <tbody>
          { value.line_items.map((line_item, index) => (
            <tr key={`line_item_${index}`}>
              <td>{ line_item.description } x { line_item.quantity }</td>
              <td className="right aligned">{ numeral(line_item.total).format('0.00') }</td>
            </tr>
          )) }
          <tr>
            <td>Total</td>
            <td className="right aligned">{ numeral(value.line_items.reduce((total, line_item) => {
              return total + Number(line_item.total)
            }, 0)).format('0.00') }</td>
          </tr>
        </tbody>
      </table>
    )
  } else if(type === 'addressfield') {
    return <span>{ value.description }</span>
  } else if(type === 'checkbox') {
    return value ? 'checked' : 'not checked'
  } else if(_.includes(['checkboxes','checkboxgroup'], type)) {
    return <span>{ `${value.join(', ')}` }</span>
  } else if(type === 'filefield') {
    return (
      <div>
        { _.castArray(value).map((file, index) => (
          <div key={`file_${index}`}>
            <Button label={ file.file_name } className="link" route={`/admin/assets/${file.id}`} />
          </div>
        ))}
      </div>
    )
  }
  return <span>{ value }</span>
}

Content.propTypes = {
  data: PropTypes.object,
  field: PropTypes.object
}

export default Content
