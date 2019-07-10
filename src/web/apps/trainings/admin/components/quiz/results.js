import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    quiz: PropTypes.object
  }

  static defaultProps = {}

  _handleClose = this._handleClose.bind(this)

  render() {
    const { quiz } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="quiz-results-inner">
          { quiz.was_passed ?
            <i className="fa fa-star" /> :
            <i className="fa fa-ban" />
          }
          { quiz.was_passed ?
            <h1>You Passed</h1> :
            <h1>You Did Not Pass</h1>
          }
          <p>
            You answered { quiz.correct_count } / { quiz.total_count } questions
            correctly
          </p>
          <div className="ui basic button" onClick={ this._handleClose }>
            Close Quiz
          </div>
        </div>
      </div>
    )
  }

  _getClass() {
    const { quiz } = this.props
    const classes = ['quiz-results']
    classes.push(quiz.was_passed ? 'green' : 'red')
    return classes.join(' ')
  }

  _handleClose() {
    this.context.modal.close()
  }

}

export default Results
