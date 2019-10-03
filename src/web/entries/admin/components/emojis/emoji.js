import PropTypes from 'prop-types'
import React from 'react'

class Emoji extends React.Component {

  static propTypes = {
    unicode: PropTypes.string,
    vendor: PropTypes.string
  }


  render() {
    return (
      <span className={ this._getClass() }>
        foo{ this._getCodePoint() }
      </span>
    )
  }

  _getClass() {
    const { unicode, vendor } = this.props
    const classes = ['emoji']
    if(vendor) classes.push(`emoji-${vendor}`)
    if(unicode) classes.push(`emoji-${unicode}`)
    return classes.join(' ')
  }

  _getCodePoint() {
    const { unicode } = this.props
    return unicode.split('-').map(code => String.fromCodePoint(`0x${code}`)).join('')
  }

}

export default Emoji
