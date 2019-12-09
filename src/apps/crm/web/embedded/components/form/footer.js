import PropTypes from 'prop-types'
import React from 'react'

class Footer extends React.Component {

  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const { text } = this.props
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
