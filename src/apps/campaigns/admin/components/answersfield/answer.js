import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class Answer extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    answer: PropTypes.object,
    mode: PropTypes.string,
    onDone: PropTypes.func
  }

  static defaultProps = {
    answer: {}
  }

  state = {
    config: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    if(!this.state.config) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { answer } = this.props
    this.setState({
      config: {
        ...this._getDefault(),
        ...answer
      }
    })
  }

  _getDefault() {
    return {
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      operation: '$eq',
      text: ''
    }
  }

  _getForm() {
    const { mode } = this.props
    const { config } = this.state
    return {
      title: 'Answer',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      saveText: mode === 'new' ? 'Add' : 'Update',
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', value: config.code },
            { label: 'Answer', type: 'segment', instructions: `
              Answers are not case sensitive and leading and trailing spaces
              will be removed
            `, fields: [
              { name: 'operation', type: 'radiogroup', deselectable: false, options: [
                { value: '$eq', text: 'equals' },
                { value: '$neq', text: 'does not equal' },
                { value: '$ct', text: 'contains' },
                { value: '$nct', text: 'does not contain' }
              ], defaultValue: config.operation },
              { name: 'text', type: 'textfield', placeholder: 'Enter word or phrase', defaultValue: config.text }
            ] }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleDone() {
    const { config } = this.state
    this.props.onDone(config)
    this.context.form.pop()
  }

}

export default Answer
