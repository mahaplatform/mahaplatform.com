import PropTypes from 'prop-types'
import Options from './options'
import React from 'react'

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
    const { cid, excludeIds, format, multiple, records, selected, text, value, onToggle } = this.props
    return {
      cid,
      excludeIds,
      format,
      multiple,
      options: records,
      selected,
      text,
      value,
      onToggle
    }
  }

}

export default Dynamic
