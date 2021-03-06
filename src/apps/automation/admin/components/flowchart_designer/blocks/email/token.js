import PropTypes from 'prop-types'
import { Image } from '@admin'
import React from 'react'
import _ from 'lodash'

class Token extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    action: PropTypes.string,
    email_id: PropTypes.number
  }

  state = {
    email: null
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { email } = this.state
    if(!email) return null
    return (
      <div>
        <span>{ email.display_name  }</span>
        <div style={{ width: 80, height: 120, margin: '10px auto' }}>
          <Image src={ `/${email.preview}` } transforms={{ cover: 'fit', w: 200, h: 300 }} />
        </div>
      </div>
    )

  }

  componentDidMount() {
    const { email_id } = this.props
    if(email_id) this._handleFetch()
  }

  componentDidUpdate(prevProps) {
    const { email_id } = this.props
    if(!_.isEqual(email_id, prevProps.email_id)) {
      this._handleFetch()
    }
  }

  _handleFetch() {
    const { email_id } = this.props
    this.context.network.request({
      endpoint: `/api/admin/automation/emails/${email_id}`,
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess({ data }) {
    this.setState({
      email: data
    })
  }
}


export default Token
