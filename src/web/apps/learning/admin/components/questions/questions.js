import PropTypes from 'prop-types'
import Question from './question'
import React from 'react'
import New from './new'

class Questions extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    expanded: PropTypes.array,
    quiz: PropTypes.object,
    questions: PropTypes.array,
    onFetch: PropTypes.func,
    onMove: PropTypes.func,
    onReorder: PropTypes.func
  }

  static defaultProps = {}

  _handleFetch = this._handleFetch.bind(this)
  _handleJoin = this._handleJoin.bind(this)
  _handleLeave = this._handleLeave.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { questions } = this.props
    return (
      <div className="questions">
        { questions.length === 0 &&
          <div className="questions-empty">
            There are no questions for this quiz
          </div>
        }
        { questions.map((question, index) => (
          <Question { ...this._getQuestion(question, index) } key={`question_${question.id}`} />
        ))}
        <div className="questions-footer">
          <div className="ui blue fluid button" onClick={ this._handleNew }>
            Add Question
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleFetch()
    this._handleJoin()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getQuestion(question, index) {
    const { quiz, onMove, onReorder } = this.props
    return {
      quiz,
      index,
      question,
      onMove,
      onReorder
    }
  }

  _handleFetch() {
    const { quiz } = this.props
    this.props.onFetch(quiz.id)
  }

  _handleJoin() {
    const { network } = this.context
    const { quiz } = this.props
    network.join(`/admin/learning/quizes/${quiz.id}/questions`)
    network.subscribe([
      { target: `/admin/learning/quizes/${quiz.id}/questions`, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { quiz } = this.props
    network.leave(`/admin/learning/quizes/${quiz.id}/questions`)
    network.unsubscribe([
      { target: `/admin/learning/quizes/${quiz.id}/questions`, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleNew() {
    const { quiz } = this.props
    this.context.modal.push(<New quiz={ quiz } />)
  }

}

export default Questions
