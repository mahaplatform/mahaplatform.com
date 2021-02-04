import { Infinite, Searchbox} from '@admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'
import SMS from '../../sms'

class Contacts extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    q: ''
  }

  _handleChannel = this._handleChannel.bind(this)
  _handleQuery = this._handleQuery.bind(this)

  render() {
    return (
      <div className="maha-phone-search">
        <div className="maha-phone-search-header">
          <Searchbox { ...this._getSearchBox() } />
        </div>
        <div className="maha-phone-search-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const { program } = this.props
    const { q } = this.state
    return {
      endpoint: `/api/admin/crm/programs/${program.id}/channels/sms`,
      refresh: `/admin/crm/programs/${program.id}/channels/sms`,
      filter: {
        q
      },
      empty: {
        icon: 'comments',
        title: 'No Conversations',
        text: 'There are no sms conversations for this program'
      },
      layout: Results,
      props: {
        onChoose: this._handleChannel
      }
    }
  }

  _getSearchBox() {
    return {
      onChange: this._handleQuery
    }
  }

  _getSMS(channel) {
    const { program, onPop, onPush } = this.props
    return {
      phone_number: channel.phone_number,
      program,
      onPop,
      onPush
    }
  }

  _handleChannel(channel) {
    this.props.onPush(SMS, this._getSMS.bind(this, channel))
  }

  _handleQuery(q) {
    this.setState({ q })
  }

}

export default Contacts
