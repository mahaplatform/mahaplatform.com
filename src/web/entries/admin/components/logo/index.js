import React from 'react'
import PropTypes from 'prop-types'
import Image from '../image'

class Logo extends React.Component {

  static propTypes = {
    host: PropTypes.string,
    team: PropTypes.object,
    width: PropTypes.string
  }

  static defaultProps = {
    host: null,
    width: '150'
  }

  render() {
    const { team } = this.props
    return (
      <div className="maha-logo">
        <div className="maha-logo-badge">
          <div className="maha-logo-wrapper">
            { team.logo && <Image { ...this._getImage() } /> }
            { !team.logo && <div className="maha-logo-text">{ this._getInitials() }</div> }
          </div>
        </div>
      </div>
    )
  }

  _getImage() {
    const { host, team, width } = this.props
    return {
      host,
      src: team.logo,
      title: team.title,
      transforms: { fit: 'cover', w: width, h: width }
    }
  }

  _getInitials() {
    const { team } = this.props
    const parts = team.title.split(' ')
    if(parts.length === 1) return parts[0][0]
    return parts[0][0] + parts[parts.length - 1][0]
  }

}

export default Logo
