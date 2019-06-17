import CompactPresenceToken from '../../tokens/presence/compact'
import React from 'react'
import PropTypes from 'prop-types'
import Image from '../image'

class Avatar extends React.Component {

  static propTypes = {
    icon: PropTypes.string,
    presence: PropTypes.bool,
    title: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]),
    user: PropTypes.object,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    onFail: PropTypes.func,
    onLoad: PropTypes.func
  }

  static defaultProps = {
    width: 150,
    presence: true,
    onFail: () => {},
    onLoad: () => {}
  }

  _handleLoad = this._handleLoad.bind(this)
  _handleFail = this._handleFail.bind(this)

  render() {
    const { icon, presence, user } = this.props
    const { initials, photo } = user
    if(!user) return <div className="maha-avatar" />
    return (
      <div className="maha-avatar">
        <div className="maha-avatar-badge">
          <div className="maha-avatar-wrapper">
            { photo &&  <Image { ...this._getImage() } /> }
            { !photo && icon && <i className={`fa fa-fw fa-${icon}`} /> }
            { !photo && !icon &&
              <div className="maha-avatar-text">{ initials }</div>
            }
          </div>
        </div>
        { presence && <CompactPresenceToken { ...user } />}
      </div>
    )
  }

  _getImage() {
    const { width, user } = this.props
    return {
      src: user.photo,
      title: this._getTitle(),
      alt: user.initials,
      transforms: {
        fit: 'cover',
        w: width,
        h: width
      },
      onLoad: this._handleLoad
    }
  }

  _getTitle() {
    const { title, user } = this.props
    if(title === false) return null
    return title || user.full_name
  }

  _handleLoad() {
    this.props.onLoad()
  }

  _handleFail() {
    this.props.onFail()
  }

}

export default Avatar
