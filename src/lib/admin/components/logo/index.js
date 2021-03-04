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
          <div className={this._getClass()}>
            { team.logo && <Image { ...this._getImage() } /> }
            { !team.logo && <div className="maha-logo-text">{ this._getInitials() }</div> }
          </div>
        </div>
      </div>
    )
  }

  _getClass() {
    const { team } = this.props
    const classes = ['maha-logo-wrapper']
    if(!team.logo) classes.push('background')
    return classes.join(' ')
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
    const parts = team.title.replace(/[^\w]/g, '').toUpperCase().split(' ')
    if(parts.length === 1) return parts[0].substr(0, 2)
    return parts[0][0] + parts[parts.length - 1][0]
  }

}

export default Logo
