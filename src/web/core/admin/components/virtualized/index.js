import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Virtualized extends React.PureComponent {

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
    bottom: 0,
    isScrolling: false,
    show: 0,
    top: 0
  }

  array = null
  cache = {}
  container = null
  root = null

  _handleScroll = this._handleScroll.bind(this)
  _handleStop = _.debounce(this._handleStop.bind(this), 100)

  constructor(props) {
    super(props)
    this.array = new Array(props.rowCount).fill(0).map((i, index) => index)
  }

  render() {
    const { top, bottom } = this.state
    const { rowRender } = this.props
    return (
      <div className="virtualized" ref={ node => this.root = node }>
        <div className="virtualized-container" ref={ node => this.container = node } onScroll={ this._handleScroll }>
          <div style={ this._getInnerStyle() }>
            { this.array.filter(index => {
              return index >= top && index <= bottom
            }).map(index => (
              <div key={`virtualized_${index}`} style={ this._getRowStyle(index) }>
                { rowRender(index) }
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { rowHeight } = this.props
    const show = Math.ceil(this.root.offsetHeight / rowHeight)
    this.setState({
      show,
      bottom: show * 1.5
    })

  }

  _getInnerStyle() {
    const { isScrolling } = this.state
    const { rowCount, rowHeight } = this.props
    return {
      overflow:'hidden',
      position: 'relative',
      height: rowCount * rowHeight,
      pointerEvents: isScrolling ? 'none' : ''
    }
  }

  _getRowStyle(index) {
    if(this.cache[index]) return this.cache[index]
    const { rowHeight } = this.props
    this.cache[index] = {
      position: 'absolute',
      left: 0,
      width: '100%',
      top: rowHeight * index,
      height: rowHeight
    }
    return this.cache[index]
  }

  _handleScroll(e) {
    const { show } = this.state
    const { rowHeight } = this.props
    const { scrollTop } = e.target
    if(e.target !== this.container) return
    this._handleStop()
    if(scrollTop < 0) return
    if(this.state.scrollTop === scrollTop) return
    this.setState({
      bottom: (scrollTop / rowHeight) + (1.5 * show) - 1,
      isScrolling: true,
      top: (scrollTop / rowHeight) - (0.5 * show)
    })
  }

  _handleStop() {
    this.setState({
      isScrolling: false
    })
  }

}

export default Virtualized
