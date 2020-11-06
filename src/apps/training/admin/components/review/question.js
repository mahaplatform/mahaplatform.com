import { Buttons } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Question extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    answer: PropTypes.any,
    answers: PropTypes.array,
    index: PropTypes.number,
    name: PropTypes.string,
    question: PropTypes.string,
    total: PropTypes.number,
    type: PropTypes.string,
    onAnswer: PropTypes.func,
    onBack: PropTypes.func
  }

  static defaultProps = {
    onAnswer: () => {}
  }

  textarea = null

  state = {
    value: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handlePrev = this._handlePrev.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { value } = this.state
    const { answers, question, type } = this.props
    return (
      <div className="review-question">
        <div className="review-question-body">
          <div className="review-question-inner">
            <div className="review-question-text">
              { question }
            </div>
            { type === 'select' &&
              <div className="review-question-answers">
                { answers.map((answer, index) => (
                  <div className="review-question-answer" key={`answer_${index}`} onClick={ this._handleClick.bind(this, answer.value) }>
                    <div className="review-question-answer-extra">
                      { answer.value === value ?
                        <i className="fa fa-check-circle" /> :
                        <i className="fa fa-circle-o" />
                      }
                    </div>
                    <div className="review-question-answer-label">
                      { answer.text }
                    </div>
                  </div>
                ))}
              </div>
            }
            { type === 'textarea' &&
              <div className="review-question-textarea">
                <textarea { ...this._getTextarea() } />
              </div>
            }
          </div>
        </div>
        <div className="review-question-footer">
          <Buttons { ...this._getButtons() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { answer } = this.props
    if(answer === undefined) return
    this.setState({
      value: answer
    })
  }

  _getButtons() {
    return {
      buttons: [
        this._getPrev(),
        this._getNext()
      ]
    }
  }

  _getPrev() {
    const { index } = this.props
    const is_first = index === 0
    return {
      label: 'Prev',
      color: 'red',
      handler: is_first ? () => {} : this._handlePrev
    }
  }

  _getNext() {
    const { index, total } = this.props
    const is_complete = index === total - 1
    return {
      label:  is_complete ? 'Submit' : 'Next',
      color: 'red',
      handler: !is_complete ? this._handleNext : this._handleSubmit
    }
  }

  _getTextarea() {
    return {
      ref: node => this.textarea = node,
      placeholder: 'Enter your answer',
      rows: 15,
      onChange: this._handleChange
    }
  }

  _handleChange() {
    const value = this.textarea.value
    this.setState({ value })
  }

  _handleClick(value) {
    this.setState({ value })
  }

  _handleNext() {
    const { name } = this.props
    const { value } = this.state
    if(value === null) return
    this.props.onAnswer(name, value)
  }

  _handlePrev() {
    this.props.onBack()
  }

  _handleSubmit() {
    const { name } = this.props
    const { value } = this.state
    this.props.onAnswer(name, value)
  }

}

export default Question
