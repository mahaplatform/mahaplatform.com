import PropTypes from 'prop-types'
import React from 'react'

class Columns extends React.Component {

  static propTypes = {
    columns: PropTypes.array,
    onChange: PropTypes.func,
    onToggleHidden: PropTypes.func
  }

  state = {
    show: false
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { columns } = this.props
    const { show } = this.state
    return (
      <td className="mobile config" onClick={ this._handleToggle }>
        <div className="maha-table-columns" onClick={ this._handleToggle }>
          <i className="fa fa-chevron-down" />
          { show &&
            <div className="maha-table-columns-chooser" onMouseLeave={ this._handleToggle }>
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
        </div>
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
    this.props.onToggleHidden(column.key)
    e.stopPropagation()
  }

}

export default Columns
