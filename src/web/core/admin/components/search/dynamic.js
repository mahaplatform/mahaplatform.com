import PropTypes from 'prop-types'
import Options from './options'
import React from 'react'
import _ from 'lodash'

class Dynamic extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    format: PropTypes.any,
    multiple: PropTypes.bool,
    records: PropTypes.array,
    selected: PropTypes.array,
    text: PropTypes.string,
    value: PropTypes.string,
    onToggle: PropTypes.func
  }

  render() {
    return <Options { ...this._getOptions() } />
  }

  _getOptions() {
    const { cid, format, multiple, records, selected, text, value, onToggle } = this.props
    const options = records.map(record => ({
      value: _.get(record, value),
      text: _.get(record, text),
      record
    }))
    return { cid, format, multiple, options, selected, onToggle }
  }


}

export default Dynamic
