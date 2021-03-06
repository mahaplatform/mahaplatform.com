import { Image } from '@client'
import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { image, text } = config.header
    return (
      <div className="maha-form-header">
        { image &&
          <div className="maha-form-header-image">
            <Image src={ image } transforms={{ width: 770 }} />
          </div>
        }
        { text &&
          <div className="maha-form-header-text" dangerouslySetInnerHTML={{ __html: text }} />
        }
      </div>
    )
  }

}

export default Header
