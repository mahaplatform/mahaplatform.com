import { Infinite, ModalPanel, Search } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Results from './results'
import React from 'react'

class Topic extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.string,
    defaultValue: PropTypes.object,
    endpoint: PropTypes.string,
    instructions: PropTypes.string,
    program_id: PropTypes.number,
    purpose: PropTypes.string,
    onDone: PropTypes.func
  }

  state = {
    topic_id: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="tofield-picker">
          <div className="tofield-picker-filter">
            <Search { ...this._getTopics() } />
          </div>
          <div className="tofield-picker-main">
            <Infinite { ...this._getInfinite() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(!defaultValue) return
    const { topic_id } = defaultValue
    this.setState({ topic_id })
  }

  _getInfinite() {
    const { endpoint } = this.props
    const { topic_id } = this.state
    return {
      empty: {
        icon: 'filter',
        title: 'Choose a topic',
        text: 'Choose a topic to find contacts that match'
      },
      endpoint,
      query: {
        topic_id
      },
      footer: ({ all, total }) => `Matching ${total} of ${pluralize('contact', all, true)}`,
      layout: Results
    }
  }


  _getTopics() {
    const { defaultValue, program_id } = this.props
    return {
      defaultValue: defaultValue ? defaultValue.topic_id : null,
      endpoint: `/api/admin/crm/programs/${program_id}/topics`,
      prompt: 'Find a topic',
      value: 'id',
      text: 'title',
      onChange: this._handleChoose
    }
  }

  _getPanel() {
    const { instructions } = this.props
    const { topic_id } = this.state
    return {
      title: 'Choose a Topic',
      instructions,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: topic_id ? [
        { label: 'Done', handler: this._handleDone }
      ] : null
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChoose(topic_id) {
    this.setState({ topic_id })
  }

  _handleDone() {
    const { topic_id } = this.state
    this.props.onDone({ topic_id })
    this.context.form.pop()
  }

}

export default Topic
