import * as options from './variables'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Token extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    comparison: PropTypes.string,
    fields: PropTypes.array,
    value: PropTypes.string
  }

  render() {
    return (
      <div className="">
        { this._getDescription() }
      </div>
    )
  }


  _getComparison(field, rule) {
    return options.comparisons.find(comparison => {
      return rule.comparison === comparison.value && _.includes(comparison.types, field.type)
    })
  }

  _getDescription(rule) {
    const { code, comparison, fields, value } = this.props
    const field = _.find(fields, { code })
    const comp = this._getComparison(field, { comparison })
    const parts = ['If']
    if(code) parts.push(field.name)
    if(comp) parts.push(comp.text)
    if(value) parts.push(value)
    return parts.join(' ')
  }

}

export default Token