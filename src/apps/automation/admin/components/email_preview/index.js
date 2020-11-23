import { Image } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class EmailPreview extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    host: PropTypes.object
  }

  static propTypes = {
    email: PropTypes.object,
    link: PropTypes.string
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { email } = this.props
    return (
      <div className="crm-email-preview" onClick={ this._handleClick }>
        { email.preview &&
          <Image src={ `/${email.preview}` } transforms={{ h: 360 }} />
        }
      </div>
    )
  }

  _handleClick() {
    this.context.host.openWindow(this.props.link)
  }

}

export default EmailPreview
