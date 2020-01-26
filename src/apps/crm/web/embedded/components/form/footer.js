import PropTypes from 'prop-types'
import React from 'react'

class Footer extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { text } = config.footer
    return (
      <div className="maha-form-footer">
        { text &&
          <div className="maha-form-footer-text" dangerouslySetInnerHTML={{ __html: text }} />
        }
      </div>
    )
  }

}

export default Footer
