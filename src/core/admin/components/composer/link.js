import PropTypes from 'prop-types'
import Link from '../link'
import React from 'react'

class ComposerLink extends React.Component {

  static propTypes = {
    link: PropTypes.object,
    onRemove: PropTypes.func
  }

  _handleRemove = this._handleRemove.bind(this)

  render() {
    const { link } = this.props
    return (
      <div className="maha-composer-link">
        <Link link={ link } active={ false } />
        <i className="fa fa-times" onClick={ this._handleRemove } />
      </div>
    )
  }

  _handleRemove() {
    this.props.onRemove()
  }

}

export default ComposerLink
