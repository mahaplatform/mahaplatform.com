import PropTypes from 'prop-types'
import React from 'react'

class Columns extends React.Component {

  static propTypes = {
    columns: PropTypes.array,
    onChange: PropTypes.func
  }

  state = {
    show: false
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { columns } = this.props
    const { show } = this.state
    return (
      <td className="maha-table-head-cell mobile config" onClick={ this._handleToggle }>
        <i className="fa fa-chevron-down" />
        { show &&
          <div className="maha-table-columns" onMouseLeave={ this._handleToggle }>
            { columns.map((column, index) => (
              <div className="maha-table-column" key={`column_${index}`} onClick={ this._handleToggleColumn.bind(this, column) }>
                <div className="maha-table-column-label">
                  { column.label }
                </div>
                <div className="maha-table-column-icon">
                  { column.visible && !column.primary && <i className="fa fa-fw fa-check" /> }
                  { column.primary && <i className="fa fa-fw fa-lock" /> }
                </div>
              </div>
            ))}
          </div>
        }
      </td>
    )
  }

  _handleToggle(e) {
    this.setState({
      show: !this.state.show
    })
    e.stopPropagation()
  }

  _handleToggleColumn(column, e) {
    const { columns } = this.props
    this.props.onChange(columns.map(col => ({
      ...col,
      visible: (col.key === column.key && col.primary !== true) ? !col.visible : col.visible
    })))
    e.stopPropagation()
  }

}

export default Columns
