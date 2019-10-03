import { RadioGroup } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Question extends React.Component {

  static propTypes = {
    questions: PropTypes.array,
    token: PropTypes.string,
    onChooseQuestion: PropTypes.func
  }

  _handleChooseQuestion = this._handleChooseQuestion.bind(this)

  render() {
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <h2>Choose a Security Question</h2>
            <p>In the event that you forget your password, we&apos;ll need a way to
            make sure that you are you. Please choose a security question
            to help protect your account.</p>
            <RadioGroup { ...this._getRadioGroup()} />
          </div>
        </div>
      </div>
    )
  }

  _getRadioGroup() {
    return {
      options: this.props.questions,
      value: 'id',
      text: 'text',
      onChange: this._handleChooseQuestion
    }
  }

  _handleChooseQuestion(id) {
    this.props.onChooseQuestion(id)
  }

}

export default Question
