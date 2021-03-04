import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Rating extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  state = {
    score: 0,
    hover: -1
  }

  render() {
    const { score, hover } = this.state
    const value = Math.max(score, hover)
    return (
      <div className="rating">
        { [...Array(value)].map((i, index) => (
          <div key={`rating_${index}`} { ...this._getStar(index) }>
            <i className="fa fa-star" />
          </div>
        ))}
        { [...Array(5 - value)].map((i, index) => (
          <div key={`rating_${index}`} { ...this._getStar(index) }>
            <i className="fa fa-star-o" />
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(_.isNil(defaultValue)) return
    this.setState({ score: defaultValue })
  }

  componentDidUpdate(prevProps, prevState) {
    const { defaultValue } = this.props
    const { score } = this.state
    if(score !== prevState.score) {
      this.props.onChange(score)
    }
    if(defaultValue !== prevProps.defaultValue) {
      this.setState({ score: defaultValue })
    }
  }

  _getStar(index) {
    return {
      className: 'rating-star',
      onMouseEnter: this._handleHover.bind(this, index + 1),
      onMouseLeave: this._handleHover.bind(this, -1),
      onClick: this._handleClick.bind(this, index + 1)
    }
  }

  _handleClick(score) {
    this.setState({ score })
  }

  _handleHover(hover) {
    this.setState({ hover })
  }

}

export default Rating
