import PropTypes from 'prop-types'
import React from 'react'
import Row from './row'

class Body extends React.Component {

  static propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
    onRemove: PropTypes.func,
    onReorder: PropTypes.func,
    onUpdate: PropTypes.func
  }

  render() {
    const { rows} = this.props
    return (
      <div className="maha-tablefield-body">
        { rows.map((row, index) => (
          <Row { ...this._getRow(row, index) }  key={`row_${row.code}`} />
        ))}
      </div>
    )
  }

  _getRow(row, index) {
    const { columns, onRemove, onReorder, onUpdate } = this.props
    return {
      row,
      columns,
      index,
      onRemove,
      onReorder,
      onUpdate
    }
  }

}

export default Body
