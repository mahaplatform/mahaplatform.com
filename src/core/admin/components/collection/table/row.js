import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Row extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    style: PropTypes.object
  }

  row = null

  state = {
    height: null
  }

  _handleSetHeight = this._handleSetHeight.bind(this)

  render() {
    const { data, index } = this.props
    const { columns, records } = data
    return (
      <div className="maha-table-row" style={ this._getRowStyle() } ref={ node => this.row = node }>
        { columns.map((column, i) => (
          <div className="maha-table-cell" key={`column_${i}`} style={ this._getStyle(i) }>
            { _.get(records[index], column.key) }
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    setTimeout(this._handleSetHeight, 50)
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props
    if(!_.isEqual(data.width, prevProps.data.width)) {
      this._handleSetHeight()
    }
  }

  _getRowStyle() {
    const { height } = this.state
    const { style } = this.props
    return {
      position: style.position,
      left: style.left,
      top: style.top,
      width: style.width,
      ...height ? { height } : {}
    }
  }

  _getStyle(index) {
    const { data } = this.props
    return data.widths[index]
  }

  _handleSetHeight() {
    if(!this.row) return
    const { index } = this.props
    this.setState({
      height: null
    }, () => {
      let height = 0
      this.row.childNodes.forEach((node, index) => {
        height = Math.max(height, node.getBoundingClientRect().height)
      })
      this.setState({ height })
      this.props.data.onSetHeight(index, height)
    })
  }

}

export default Row
