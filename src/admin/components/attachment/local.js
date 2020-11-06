import React from 'react'
import PropTypes from 'prop-types'

class Local extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    from_url: PropTypes.string,
    title_link: PropTypes.string
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { from_url } = this.props
    return (
      <span className="maha-attachment-local" onClick={ this._handleClick }>
        { from_url }
      </span>
    )
  }

  _handleClick(e) {
    const { router } = this.context
    const { title_link } = this.props
    router.history.push(title_link)
    e.stopPropagation()
  }

}

export default Local
