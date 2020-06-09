import { Infinite, Searchbox } from 'maha-admin'
import Voicemail from './voicemail'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Voicemails extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    onCall: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    q: ''
  }

  _handleChoose = this._handleChoose.bind(this)
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

  _getVoicemail(voicemail) {
    const { program, onCall, onPop } = this.props
    return {
      program,
      voicemail_id: voicemail.id,
      onCall,
      onPop
    }
  }

  _getInfinite() {
    const { program } = this.props
    const { q } = this.state
    return {
      endpoint: `/api/admin/crm/programs/${program.id}/voicemails`,
      filter: {
        ...q.length > 0 ? { q } : {}
      },
      empty: {
        icon: 'voicemail',
        title: 'No Voicemails',
        text: 'There are no voicemails for this program'
      },
      layout: Results,
      props: {
        onChoose: this._handleChoose
      }
    }
  }

  _getSearchBox() {
    return {
      onChange: this._handleQuery
    }
  }

  _handleChoose(voicemail) {
    this.props.onPush(Voicemail, this._getVoicemail(voicemail))
  }

  _handleQuery(q) {
    this.setState({ q })
  }

}

export default Voicemails
