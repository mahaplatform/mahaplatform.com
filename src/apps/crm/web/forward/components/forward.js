import PropTypes from 'prop-types'
import { Form } from 'maha-client'
import React from 'react'

class Forward extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    email_address: PropTypes.object,
    mailing_address: PropTypes.object,
    phone_number: PropTypes.object,
    program: PropTypes.object,
    token: PropTypes.string,
    topics: PropTypes.array
  }

  render() {
    const { program } = this.props
    return (
      <div className="overlay">
        <div className="preferences">
          <div className="panel">
            <div className="panel-header">
              <div className="panel-header-logo">
                <img src={`/imagecache/fit=cover&w=80&h=80${program.logo}`} />
              </div>
              <div className="panel-header-details">
                <h1>{ program.title }</h1>
                <p>Forward to a Friend</p>
              </div>
            </div>
            <div className="panel-body">
              <Form { ...this._getForm() } />
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getForm() {
    return {
      fields: [
        { label: 'Name', name: 'name', type: 'textfield' },
        { label: 'Email', name: 'email', type: 'emailfield' },
        { label: 'Message', name: 'message', type: 'textarea', rows: 5 }
      ]
    }
  }

}

export default Forward
