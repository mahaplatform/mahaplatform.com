import PropTypes from 'prop-types'
import { Button } from '@admin'
import Answer from './answer'
import React from 'react'
import _ from 'lodash'

class AnswersField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    answers: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCreate = this._handleCreate.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { answers } = this.state
    return (
      <div className="crm-recipientsfield">
        <div className="crm-recipientsfield-recipients">
          { answers.map((answer, index) => (
            <div className="crm-recipientsfield-recipient" key={`answer_${index}`}>
              <div className="crm-recipientsfield-recipient-label">
                { this._getDescription(answer) }
              </div>
              <div className="crm-recipientsfield-recipient-action" onClick={ this._handleEdit.bind(this, index)}>
                <i className="fa fa-pencil" />
              </div>
              <div className="crm-recipientsfield-recipient-action" onClick={ this._handleRemove.bind(this, index)}>
                <i className="fa fa-times" />
              </div>
            </div>
          ))}
          <div className="crm-recipientsfield-recipients-add">
            <Button { ...this._getAdd() } />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.setState({
      answers: defaultValue
    })
    this.props.onReady(this._handleValidate)
  }

  componentDidUpdate(prevProps, prevState) {
    const { answers } = this.state
    if(!_.isEqual(answers, prevState.answers)) {
      this.props.onChange(answers)
    }
  }

  _getAdd() {
    return {
      label: 'Add Answer',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getDescription(answer) {
    const { operation, text } = answer
    if(operation === '$eq') return `equals "${text}"`
    if(operation === '$ct') return `contains "${text}"`
  }

  _getNew() {
    return {
      mode: 'new',
      onDone: this._handleCreate
    }
  }

  _getEdit(index) {
    const answer = this.state.answers[index]
    return {
      answer,
      mode: 'edit',
      onDone: this._handleUpdate.bind(this, index)
    }
  }

  _handleAdd() {
    this.context.form.push(Answer, this._getNew())
  }

  _handleCreate(answer) {
    const { answers } = this.state
    this.setState({
      answers: [
        ...answers,
        answer
      ]
    })
  }

  _handleEdit(index) {
    this.context.form.push(Answer, this._getEdit(index))
  }

  _handleRemove(remove) {
    const { answers } = this.state
    this.setState({
      answers: answers.filter((answer, index) => {
        return index !== remove
      })
    })
  }

  _handleUpdate(i, updated) {
    const { answers } = this.state
    this.setState({
      answers: answers.map((answer, index) => {
        return index === i ? updated : answer
      })
    })
  }

  _handleValidate() {
    const { answers } = this.state
    const { required, onValid } = this.props
    if(required && (!answers || answers.length === 0)) {
      return onValid(null, ['You must add at least 1 answer'])
    }
    onValid(answers)
  }

}

export default AnswersField
