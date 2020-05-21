import { Infinite, Searchbox } from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Channels extends React.PureComponent {

  static propTypes = {
    channels: PropTypes.array,
    program: PropTypes.object,
    records: PropTypes.array,
    type: PropTypes.object,
    onChoose: PropTypes.func
  }

  state = {
    q: ''
  }

  _handleQuery = this._handleQuery.bind(this)

  render() {
    return (
      <div className="crm-program-channels-channels">
        <div className="crm-program-channels-channels-header">
          <Searchbox { ...this._getSearchbox() } />
        </div>
        <div className="crm-program-channels-channels-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getClass(channel) {
    const { selected } = this.state
    const classes = ['crm-program-channels-channel']
    if(channel.id === selected) classes.push('selected')
    return classes.join(' ')
  }

  _getInfinite() {
    const { program, type, onChoose } = this.props
    const { q } = this.state
    return {
      endpoint: `/api/admin/crm/programs/${program.id}/channels/${type}`,
      refresh: `/admin/crm/programs/${program.id}/channels/${type}`,
      filter: {
        q
      },
      layout: Results,
      props: {
        onChoose
      }
    }
  }

  _getSearchbox() {
    return {
      onChange: this._handleQuery
    }
  }

  _handleQuery(q) {
    this.setState({ q })
  }

}

export default Channels
