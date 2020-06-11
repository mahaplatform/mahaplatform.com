import { Infinite, Searchbox} from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'
import Call from './call'

class Calls extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    program: PropTypes.object,
    onCall: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    q: ''
  }

  _handleCall = this._handleCall.bind(this)
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

  _getCall(call) {
    const { program, onCall, onPop, onPush } = this.props
    return {
      call,
      program,
      onCall,
      onPop,
      onPush
    }
  }

  _getClient(channel) {
    const { program, onPop, onPush } = this.props
    return {
      program,
      channel,
      onPop,
      onPush
    }
  }

  _getInfinite() {
    const { program } = this.props
    const { q } = this.state
    return {
      endpoint: `/api/admin/crm/programs/${program.id}/channels/voice/calls`,
      refresh: `/admin/crm/programs/${program.id}/channels/voice/calls`,
      filter: {
        q
      },
      empty: {
        icon: 'phone',
        title: 'No Calls',
        text: 'There are no calls for this program'
      },
      layout: Results,
      props: {
        onChoose: this._handleCall
      }
    }
  }

  _getSearchBox() {
    return {
      onChange: this._handleQuery
    }
  }

  _handleQuery(q) {
    this.setState({ q })
  }

  _handleCall(call) {
    this.props.onPush(Call, this._getCall(call))
  }

}

export default Calls
