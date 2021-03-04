import PropTypes from 'prop-types'
import React from 'react'
import Body from './body'
import _ from 'lodash'

class TableField extends React.Component {

  static propTypes = {
    columns: PropTypes.array,
    defaultValue: PropTypes.array,
    isValid: PropTypes.bool,
    headers: PropTypes.bool,
    placeholder: PropTypes.string,
    reorderable: PropTypes.bool,
    row: PropTypes.object,
    rows: PropTypes.array,
    values: PropTypes.object,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onSet: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onReorder: PropTypes.func,
    onSetValue: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    headers: true,
    reorderable: true,
    onChange: () => {},
    onReady: () => {}
  }

  columns = []

  _handleAdd = this._handleAdd.bind(this)
  _handleKeyDown = this._handleKeyDown.bind(this)

  render() {
    const { columns, headers, reorderable } = this.props
    return (
      <div className="maha-tablefield">
        { headers &&
          <div className="maha-tablefield-header">
            <div className="maha-tablefield-row">
              { reorderable &&
                <div className="maha-tablefield-handle">&nbsp;</div>
              }
              { columns.map((column, j) => (
                <div className="maha-tablefield-column" key={`column_${j}`}>
                  { column.label }
                </div>
              ))}
              <div className="maha-tablefield-actions">&nbsp;</div>
            </div>
          </div>
        }
        <Body { ...this._getBody() } />
        <div className="maha-tablefield-footer">
          <div className="maha-tablefield-row">
            { reorderable &&
              <div className="maha-tablefield-handle">&nbsp;</div>
            }
            { columns.map((column, j) => (
              <div className="maha-tablefield-column" key={`column_${j}`}>
                <input { ...this._getInput(column) } />
              </div>
            ))}
            <div className="maha-tablefield-actions" onClick={ this._handleAdd }>
              <i className="fa fa-fw fa-plus" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet, onReady } = this.props
    if(defaultValue) {
      onSet(defaultValue.map(row => ({
        ...row,
        code: _.random(100000000, 999999999).toString(36)
      })))
    }
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { rows } = this.props
    if(!_.isEqual(rows, prevProps.rows)) {
      this.props.onChange(rows.map(row => _.omit(row, ['code'])))
    }
  }

  _getInput(column) {
    const { placeholder, values } = this.props
    return {
      type: 'text',
      placeholder: placeholder || column.label,
      ref: (node) => this.columns[column.key] = node,
      onKeyDown: this._handleKeyDown,
      onChange: this._handleChange.bind(this, column.key),
      value: values[column.key] || ''
    }
  }

  _getBody() {
    const { columns, rows, reorderable, onRemove, onReorder, onUpdate } = this.props
    return {
      columns,
      reorderable,
      rows,
      onRemove,
      onReorder,
      onUpdate
    }
  }

  _handleAdd() {
    const { isValid, row, onAdd } = this.props
    if(isValid) onAdd({
      ...row,
      code: _.random(100000000, 999999999).toString(36)
    })
  }

  _handleChange(key, e) {
    this.props.onSetValue(key, e.target.value)
  }

  _handleKeyDown(e) {
    if(!(e.keyCode === 13 && e.shiftKey === false)) return
    e.preventDefault()
    this._handleAdd()
  }

}

export default TableField
