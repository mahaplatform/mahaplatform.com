import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Search from './search'
import React from 'react'

class Help extends React.Component {

  static propTypes = {
    articles: PropTypes.array,
    article: PropTypes.object,
    items: PropTypes.array,
    q: PropTypes.string,
    onClose: PropTypes.func,
    onDone: PropTypes.func,
    onFetch: PropTypes.func,
    onType: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-help-main">
          <Search { ...this._getSearch() } />
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Help Center',
      color: 'green',
      leftItems: [
        { icon: 'remove', handler: this._handleDone }
      ]
    }
  }

  _getSearch() {
    return {
      q: this.props.q,
      onClick: this._handleFetch,
      onType: this._handleType
    }
  }

  _handleType(q) {
    this.props.onType(q)
  }

  _handleFetch(id) {
    this.props.onFetch(id)
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Help
