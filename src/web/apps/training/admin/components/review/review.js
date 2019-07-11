import PropTypes from 'prop-types'
import React from 'react'
import { Rating } from 'maha-admin'

class Review extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="review-question">
        <div className="review-question-text">
          How would you rate the overall quality of the presentation?
        </div>
        <div className="review-question-answer">
          <Rating />
        </div>

      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default Review
