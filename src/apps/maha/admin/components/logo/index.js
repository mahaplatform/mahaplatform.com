import React from 'react'
import PropTypes from 'prop-types'
import Image from '../image'

class Logo extends React.Component {

  static propTypes = {
    team: PropTypes.object,
    width: PropTypes.string
  }

  static defaultProps = {
    width: 150
  }

  render() {
    const { team, width } = this.props
    return (
      <div className="maha-logo">
        <div className="maha-logo-badge">
          <div className="maha-logo-wrapper">
            { team.logo && <Image src={team.logo} title={team.title} transforms={{ fit: 'cover', w: width, h: width }} /> }
            { !team.logo && <div className="logo-text">{ team.title[0] }</div> }
          </div>
        </div>
      </div>
    )
  }

}

export default Logo
