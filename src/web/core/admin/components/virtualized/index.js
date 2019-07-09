import PropTypes from 'prop-types'
import React from 'react'

class Virtualized extends React.Component {

  static contextTypes = {}

  static propTypes = {
    children: PropTypes.any,
    rowCount: PropTypes.number,
    rowHeight: PropTypes.number,
    rowRender: PropTypes.func
  }

  static defaultProps = {
  }

  state = {
    scrollTop: 0,
    show: 14
  }

  array = null
  container = null

  _handleScroll = this._handleScroll.bind(this)

  constructor(props) {
    super(props)
    this.array = new Array(props.rowCount).fill(0).map((i, index) => index)
  }

  render() {
    const { scrollTop, show } = this.state
    const { rowHeight, rowRender } = this.props
    return (
      <div className="virtualized">
        <div className="virtualized-container" ref={ node => this.container = node} onScroll={ this._handleScroll }>
          <div className="virtualized-inner" style={ this._getInnerStyle() }>
            { this.array.filter(index => {
              const top = rowHeight * (index + (1 * show))
              const bottom = rowHeight * (index - (2 * show) + 1)
              return top > scrollTop && bottom < scrollTop
            }).map(index => (
              <div className="virtualized-row" key={`virtualized_${index}`} style={ this._getRowStyle(index) }>
                { rowRender(index) }
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  _getInnerStyle() {
    const { rowCount, rowHeight } = this.props
    return {
      height: rowCount * rowHeight
    }
  }

  _getRowStyle(index) {
    const { rowHeight } = this.props
    return {
      top: rowHeight * index,
      height: rowHeight
    }
  }

  _handleScroll(e) {
    const { scrollTop } = this.container
    this.setState({ scrollTop })
  }

}

export default Virtualized
