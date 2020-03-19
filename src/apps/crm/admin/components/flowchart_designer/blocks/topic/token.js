import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const actions = [
  { value: 'add', text: 'Add to' },
  { value: 'remove', text: 'Remove from' }
]

class Token extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    action: PropTypes.string,
    topic_id: PropTypes.number
  }

  state = {
    topic: null
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { action } = this.props
    const { topic } = this.state
    const description = _.find(actions, { value: action })
    return (
      <div>
        { _.capitalize(description.text) } { topic &&
          <span>{ topic.title  }</span>
        }
      </div>
    )

  }

  componentDidMount() {
    const { topic_id } = this.props
    if(topic_id) this._handleFetch()
  }

  componentDidUpdate(prevProps) {
    const { topic_id } = this.props
    if(!_.isEqual(topic_id, prevProps.topic_id)) {
      this._handleFetch()
    }
  }

  _handleFetch() {
    const { topic_id } = this.props
    this.context.network.request({
      endpoint: `/api/admin/crm/topics/${topic_id}`,
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess({ data }) {
    this.setState({
      topic: data
    })
  }
}


export default Token
