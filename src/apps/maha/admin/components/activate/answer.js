import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Answer extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object
  }

  static propTypes = {
    questions: PropTypes.array,
    question_id: PropTypes.number,
    status: PropTypes.string,
    token: PropTypes.string,
    onChangeMode: PropTypes.func,
    onSecurity: PropTypes.func
  }

  answer = null

  state = {
    error: false
  }

  _handleSubmit = this._handleSubmit.bind(this)
  _handleBack = this._handleBack.bind(this)

  render() {
    const { questions, question_id } = this.props
    const question = _.find(questions, { id: question_id })
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <h2>Answer your question</h2>
            <p>{ question.text }</p>
            <form className={ this._getFormClass() } onSubmit={ this._handleSubmit }>
              <input type="hidden" value="something" />
              <div className="field text-field">
                <div className="ui input">
                  <input type="text" className="form-control" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Answer" ref={ (node) => this.answer = node } />
                </div>
              </div>
              <div className="field">
                <button className={`ui fluid large ${(status === 'submitting') ? 'loading' : ''} button`}>
                  Continue
                </button>
              </div>
            </form>
            <div className="maha-signin-footer">
              <p><a onClick={ this._handleBack }>Choose a different question</a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status && status === 'failure') {
      this._handleShake()
    }
  }

  _handleShake() {
    this.setState({ error: true })
    setTimeout(() => {
      this.setState({ error: false })
    }, 500)
  }

  _getFormClass() {
    const { error } = this.state
    const classes = ['ui','form']
    if(error) classes.push('animated shake')
    return classes.join(' ')
  }


  _handleBack() {
    this.props.onChangeMode('question')
  }

  _handleSubmit(e) {
    const { token, question_id, onSecurity } = this.props
    const security_question_id = question_id
    const security_question_answer = this.answer.value
    onSecurity(token, security_question_id, security_question_answer)
    e.preventDefault()
  }

}

export default Answer
