import Help from '../components/help'
import PropTypes from 'prop-types'
import React from 'react'

class Page extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return <Help { ...this._getHelp() } />
  }

  _getHelp() {
    return {
      onDone: this._handleDone
    }
  }

  _handleDone() {
    this.context.router.goBack()
  }

}

export default Page
