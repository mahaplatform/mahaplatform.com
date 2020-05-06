import PropTypes from 'prop-types'
import Options from './options'
import React from 'react'
import _ from 'lodash'

class Dynamic extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    excludeIds: PropTypes.array,
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
    const { cid, excludeIds, format, multiple, selected, text, value, onToggle } = this.props
    return {
      cid,
      excludeIds,
      format,
      multiple,
      options: this._getRecords(),
      selected,
      text,
      value,
      onToggle
    }
  }

  _getRecords() {
    const { records } = this.props
    return records.map(record => {
      return _.isString(record) ? { value: record, text: record } : record
    })
  }

}

export default Dynamic
