import { Image } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Token extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    asset_ids: PropTypes.array,
    message: PropTypes.string,
    number: PropTypes.string,
    user: PropTypes.object
  }

  state = {
    assets: null
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { message, number, user } = this.props
    const { assets } = this.state
    return (
      <div>
        { user &&
          <div>
            To { user.full_name }
          </div>
        }
        { number &&
          <div>
            To { number }
          </div>
        }
        { assets && assets.map((asset, index) => (
          <div className="crm-sms-message-token-image" key={ `asset_${asset.id}` }>
            <Image src={ asset.path } transforms={{ fit: 'cover', w: 150, h: 150 }} />
          </div>
        )) }
        &quot;{ message }&quot;
      </div>
    )
  }

  componentDidMount() {
    const { asset_ids } = this.props
    if(asset_ids) this._handleFetch()
  }

  componentDidUpdate(prevProps) {
    const { asset_ids } = this.props
    if(!_.isEqual(asset_ids, prevProps.asset_ids)) {
      this._handleFetch()
    }
  }

  _handleFetch() {
    const { asset_ids } = this.props
    this.context.network.request({
      endpoint: '/api/admin/assets',
      query: {
        $filter: {
          id: {
            $in: asset_ids
          }
        }
      },
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess({ data }) {
    this.setState({
      assets: data
    })
  }
}


export default Token
