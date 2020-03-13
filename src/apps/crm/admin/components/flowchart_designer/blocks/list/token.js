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
    list_id: PropTypes.number
  }

  state = {
    list: null
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { action } = this.props
    const { list } = this.state
    const description = _.find(actions, { value: action })
    return (
      <div>
        { _.capitalize(description.text) } { list &&
          <span>{ list.title }</span>
        }
      </div>
    )

  }

  componentDidMount() {
    const { list_id } = this.props
    if(list_id) this._handleFetch()
  }

  componentDidUpdate(prevProps) {
    const { list_id } = this.props
    if(!_.isEqual(list_id, prevProps.list_id)) {
      this._handleFetch()
    }
  }

  _handleFetch() {
    const { list_id } = this.props
    this.context.network.request({
      endpoint: `/api/admin/crm/lists/${list_id}`,
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess({ data }) {
    this.setState({
      list: data
    })
  }
}


export default Token
