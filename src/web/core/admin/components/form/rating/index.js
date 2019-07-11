import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Rating extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.number,
    onChange: PropTypes.func
  }

  state = {
    score: 0
  }

  render() {
    const { score } = this.state
    return (
      <div className="rating">
        { [...Array(score)].map((i, index) => (
          <i className="fa fa-star" key={`rating_${index}`} onClick={ this._handleClick.bind(this, index + 1) } />
        ))}
        { [...Array(5 - score)].map((i, index) => (
          <i className="fa fa-star-o" key={`rating_${index}`} onClick={ this._handleClick.bind(this, score + index + 1) } />
        ))}
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(!_.isNil(defaultValue)) {
      this.setState({ score: defaultValue })
    }
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

  _handleClick(score) {
    this.setState({ score })
  }

}

export default Rating
